using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Features.Cards.Dtos;
using TcgPocket.Features.DeckCards;
using TcgPocket.Features.Users;
using TcgPocket.Shared;

namespace TcgPocket.Features.Decks.Queries;

public class GetAllUserDecksQuery : IRequest<Response<List<DeckDisplayDto>>>
{

}

public class GetAllUserDecksQueryHandler : IRequestHandler<GetAllUserDecksQuery, Response<List<DeckDisplayDto>>>
{
    private readonly SignInManager<User> _signInManager;
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public GetAllUserDecksQueryHandler(DataContext dataContext,
        IMapper mapper, SignInManager<User> signInManager)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _signInManager = signInManager;
    }

    public async Task<Response<List<DeckDisplayDto>>> Handle(GetAllUserDecksQuery query, CancellationToken cancellationToken)
    {
        var user = await _signInManager.GetSignedInUserAsync();

        if (user is null) return Error.AsResponse<List<DeckDisplayDto>>("No user logged in", "user");

        var decks = await _dataContext.Set<Deck>()
             .AsNoTracking()
             .Where(x => x.UserId == user.Id)
             .ProjectTo<DeckGetDto>(_mapper.ConfigurationProvider)
             .ToListAsync(cancellationToken);

        var deckIds = decks.Select(x => x.Id).ToList();

        var deckCards = await _dataContext.Set<DeckCard>()
            .AsNoTracking()
            .Where(x => deckIds.Contains(x.DeckId))
            .Include(y => y.Card)
            .ThenInclude(y => y.Game)
            .Include(y => y.Card)
            .ThenInclude(y => y.Rarity)
            .Include(y => y.Card)
            .ThenInclude(y => y.Set)
            .Include(y => y.Card)
            .ThenInclude(y => y.CardType)
            .ToListAsync(cancellationToken);

        var groupedCards = new List<DeckCardDisplayDto>();

        var groupedDeck = deckCards.GroupBy(x => x.DeckId).ToList();

        groupedDeck.ForEach((deckCard) => {
            var groupedDeckCards = deckCard.GroupBy(x => x.Card.Id).ToList();

            groupedDeckCards.ForEach(cards =>
            {
                var card = _mapper.Map<CardDisplayDto>(cards.First().Card);
                
                groupedCards.Add(new DeckCardDisplayDto
                {
                    CardDisplay = card,
                    DeckId = deckCard.Key,
                    Count = cards.Count(),
                });
            });
        });

        var mappedDecks = _mapper.Map<List<DeckDisplayDto>>(decks);

        groupedCards = groupedCards.OrderBy(x => x.CardDisplay.Name).ToList();

        mappedDecks.ForEach(deck => {
            deck.Cards.AddRange(groupedCards.Where(x => x.DeckId == deck.Id));
        });

        return mappedDecks.AsResponse();
    }
}
