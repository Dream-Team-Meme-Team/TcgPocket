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
using TcgPocket.Shared.Interfaces;

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

            if (!result.IsValid)
            {
                var errors = _mapper.Map<List<Error>>(result.Errors);
                return new Response<CardGetDto>{ Errors = errors };
            }

            if (!await _dataContext.Set<Set>().AnyAsync(x => x.Id == command.CardDto.SetId))
            {
                return Error.AsResponse<CardGetDto>("Set not found", "setId");
            }
            if (!await _dataContext.Set<Rarity>().AnyAsync(x => x.Id == command.CardDto.RarityId))
            {
                return Error.AsResponse<CardGetDto>("Rarity not found", "rarityId");
            }
            if (!await _dataContext.Set<Game>().AnyAsync(x => x.Id == command.CardDto.GameId))
            {
                return Error.AsResponse<CardGetDto>("Game not found", "gameId");
            }
            if (!await _dataContext.Set<CardType>().AnyAsync(x => x.Id == command.CardDto.CardTypeId))
            {
                return Error.AsResponse<CardGetDto>("Card Type not found", "cardTypeId");
            }

            var card = await _dataContext.Set<Card>().FirstOrDefaultAsync(x => x.Id == command.Id);

            if (card is null) return Error.AsResponse<CardGetDto>("Card not found", "id");

            _mapper.Map(command.CardDto, card);
            await _dataContext.SaveChangesAsync();

            return _mapper.Map<CardGetDto>(card).AsResponse();
        }
    }
}
