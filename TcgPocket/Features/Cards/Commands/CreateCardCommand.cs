using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using Attribute = TcgPocket.Features.Attributes.Attribute;
using TcgPocket.Features.CardTypes;
using TcgPocket.Features.Games;
using TcgPocket.Features.Rarities;
using TcgPocket.Features.Sets;
using TcgPocket.Shared;
using TcgPocket.Features.CardAttributes;

namespace TcgPocket.Features.Cards.Commands
{
    public class CreateCardCommand : IRequest<Response<CardDetailDto>>
    {
        public CreateCardDto CreateCardDto { get; set; }
    }

    public class CreateCardCommandHandler : IRequestHandler<CreateCardCommand, Response<CardDetailDto>>
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;
        private readonly IValidator<CreateCardDto> _validator;

        public CreateCardCommandHandler(DataContext dataContext, IMapper mapper, IValidator<CardDto> validator)
        {
            _dataContext = dataContext;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<Response<CardDetailDto>> Handle(CreateCardCommand command, CancellationToken cancellationToken)
        {
            var result = await _validator.ValidateAsync(command.CreateCardDto);
            var errors = new List<Error>();

            if (!result.IsValid)
            {
                errors = _mapper.Map<List<Error>>(result.Errors);
                return new Response<CardDetailDto> { Errors = errors };
            }

            if (!await _dataContext.Set<Set>().AnyAsync(x => x.Id == command.CreateCardDto.SetId))
            {
                errors.Add(new Error { Message = "Set not found", Property = "setId" });
            }
            if (!await _dataContext.Set<Rarity>().AnyAsync(x => x.Id == command.CreateCardDto.RarityId))
            {
                errors.Add(new Error { Message = "Rarity not found", Property = "rarityId" });
            }
            if (!await _dataContext.Set<Game>().AnyAsync(x => x.Id == command.CreateCardDto.GameId))
            {
                errors.Add(new Error { Message = "Game not found", Property = "gameId" });
            }
            if (!await _dataContext.Set<CardType>().AnyAsync(x => x.Id == command.CreateCardDto.CardTypeId))
            {
                errors.Add(new Error { Message = "Card Type not found", Property = "cardTypeId" });
            }
            foreach (var attribute in command.CreateCardDto.Attributes)
            {
                if (!await _dataContext.Set<Attribute>().AnyAsync(x => x.Id == attribute.AttributeId))
                {
                    errors.Add(new Error { Message = "Attribute not found", Property = "attributeId" });
                }
            }

            if (errors.Any()) return new Response<CardDetailDto> { Errors = errors };

            var foos = command.CreateCardDto.Attributes.Select(x => x.AttributeId).ToList();

            var card = _mapper.Map<Card>(command.CreateCardDto);

            var yomomma = foos.Select(x => new CardAttribute
            {
                Card = card,
                AttributeId = x
            }).ToList();

            card.CardAttributes = yomomma;

            await _dataContext.Set<Card>().AddAsync(card);
            await _dataContext.SaveChangesAsync();

            return _mapper.Map<CardDetailDto>(card).AsResponse();
        }
    }
}
