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

namespace TcgPocket.Features.Cards.Commands
{
    public class CreateCardCommand : IRequest<Response<CardGetDto>>
    {
        public CardDto CardDto { get; set; }
    }

    public class CreateCardCommandHandler : IRequestHandler<CreateCardCommand, Response<CardGetDto>>
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;
        private readonly IValidator<CardDto> _validator;

        public CreateCardCommandHandler(DataContext dataContext, IMapper mapper, IValidator<CardDto> validator)
        {
            _dataContext = dataContext;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<Response<CardGetDto>> Handle(CreateCardCommand command, CancellationToken cancellationToken)
        {
            var result = await _validator.ValidateAsync(command.CardDto);
            var errors = new List<Error>();

            if (!result.IsValid)
            {
                errors = _mapper.Map<List<Error>>(result.Errors);
                return new Response<CardGetDto> { Errors = errors };
            }

            if (!await _dataContext.Set<Set>().AnyAsync(x => x.Id == command.CardDto.SetId))
            {
                errors.Add(new Error { Message = "Set not found", Property = "setId" });
            }
            if (!await _dataContext.Set<Rarity>().AnyAsync(x => x.Id == command.CardDto.RarityId))
            {
                errors.Add(new Error { Message = "Rarity not found", Property = "rarityId" });
            }
            if (!await _dataContext.Set<Game>().AnyAsync(x => x.Id == command.CardDto.GameId))
            {
                errors.Add(new Error { Message = "Game not found", Property = "gameId" });
            }
            if (!await _dataContext.Set<CardType>().AnyAsync(x => x.Id == command.CardDto.CardTypeId))
            {
                errors.Add(new Error { Message = "Card Type not found", Property = "cardTypeId" });
            }
            foreach (var attribute in command.CardDto.Attributes)
            {
                if (attribute.GameId != command.CardDto.GameId)
                {
                    errors.Add(new Error { Message = "Attribute not assignable to this card game", Property = "attributeId" });
                }
                if (!await _dataContext.Set<Attribute>().AnyAsync(x => x.Id == attribute.Id)) 
                {
                    errors.Add(new Error { Message = "Attribute not found", Property = "attributeId" });
                }
            }

            if (errors.Any()) return new Response<CardGetDto> { Errors = errors };

            var card = _mapper.Map<Card>(command.CardDto);
            await _dataContext.Set<Card>().AddAsync(card);
            await _dataContext.SaveChangesAsync();

            return _mapper.Map<CardGetDto>(card).AsResponse();
        }
    }
}
