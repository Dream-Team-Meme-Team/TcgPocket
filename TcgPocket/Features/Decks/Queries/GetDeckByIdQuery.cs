using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Features.Cards.Dtos;
using TcgPocket.Shared;

namespace TcgPocket.Features.Decks.Queries;

public class GetDeckByIdQuery : IRequest<Response<DeckDisplayDto>>
{
    public int Id { get; set; }
}

public class GetDeckByIdQueryHandler : IRequestHandler<GetDeckByIdQuery, Response<DeckDisplayDto>>
{
    private readonly DataContext _dataContext;
    private readonly IValidator<GetDeckByIdQuery> _validator;
    private readonly IMapper _mapper;

    public GetDeckByIdQueryHandler(DataContext dataContext,
        IValidator<GetDeckByIdQuery> validator,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _validator = validator;
        _mapper = mapper;
    }

    public async Task<Response<DeckDisplayDto>> Handle(GetDeckByIdQuery query, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(query, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<DeckDisplayDto> { Errors = errors };
        }

        var deck = await _dataContext.Set<Deck>()
            .AsNoTracking()
            .Include(x => x.Game)
            .Include(x => x.DeckCards)
            .ThenInclude(y => y.Card)
            .ThenInclude(y => y.Game)
            .ThenInclude(y => y.CardTypes)
            .Include(x => x.DeckCards)
            .ThenInclude(y => y.Card)
            .ThenInclude(y => y.Rarity)
            .Include(x => x.DeckCards)
            .ThenInclude(y => y.Card)
            .ThenInclude(y => y.Set)
            .FirstOrDefaultAsync(x => x.Id == query.Id, cancellationToken);

        if (deck is null) return Error.AsResponse<DeckDisplayDto>("Deck not found", "id");

        var groupedCards = new List<DeckCardDisplayDto>();

        var groupedDeckCards = deck.DeckCards.GroupBy(x => x.Card.Id).ToList();
        groupedDeckCards.ForEach(cards =>
        {
            var card = _mapper.Map<CardDisplayDto>(cards.FirstOrDefault()?.Card);
            if (card is not null)
            {
                groupedCards.Add(new DeckCardDisplayDto
                {
                    CardDisplay = card,
                    DeckId = cards.FirstOrDefault()?.DeckId ?? 0,
                    Count = cards.Count(),
                });

            }
        });

        var mappedDeck = _mapper.Map<DeckDisplayDto>(deck);

            var cards = groupedCards.Where(x => x.DeckId == mappedDeck.Id).ToList();
            if (cards is not null) mappedDeck?.Cards?.AddRange(cards);
            mappedDeck.Cards = mappedDeck?.Cards?.OrderBy(y => y.CardDisplay.Name).ToList();

        return mappedDeck.AsResponse();
    }
}