using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Features.CardTypes;
using TcgPocket.Features.Games;
using TcgPocket.Features.Rarities;
using TcgPocket.Features.Sets;
using TcgPocket.Shared;

namespace TcgPocket.Features.Cards.Commands
{
    public class UpdateCardCommand : IRequest<Response<CardGetDto>>
    {
        public int Id { get; set; }
        public CardDto CardDto { get; set; }
    }

    public class UpdateCardCommandHandler : IRequestHandler<UpdateCardCommand, Response<CardGetDto>>
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;
        private readonly IValidator<UpdateCardCommand> _validator;

        public UpdateCardCommandHandler(DataContext dataContext, IMapper mapper, IValidator<UpdateCardCommand> validator)
        {
            _dataContext = dataContext;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<Response<CardGetDto>> Handle(UpdateCardCommand command, CancellationToken cancellationToken)
        {
            var result = await _validator.ValidateAsync(command);
            var errors = new List<Error>();

            if (!result.IsValid)
            {
                errors = _mapper.Map<List<Error>>(result.Errors);
                return new Response<CardGetDto>{ Errors = errors };
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

            if (errors.Any()) return new Response<CardGetDto> { Errors = errors };

            var card = await _dataContext.Set<Card>().FirstOrDefaultAsync(x => x.Id == command.Id);

            if (card is null) return Error.AsResponse<CardGetDto>("Card not found", "id");

            _mapper.Map(command.CardDto, card);
            await _dataContext.SaveChangesAsync();

            return _mapper.Map<CardGetDto>(card).AsResponse();
        }
    }
}
