﻿using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Features.Cards.Dtos;
using TcgPocket.Features.Users;
using TcgPocket.Shared;

namespace TcgPocket.Features.Decks.Queries;

public class GetAllUserDecksForAllGamesQuery : IRequest<Response<List<DeckDisplayDto>>>
{

}

public class GetAllUserDecksForAllGamesHandler : IRequestHandler<GetAllUserDecksForAllGamesQuery, Response<List<DeckDisplayDto>>>
{
    private readonly SignInManager<User> _signInManager;
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public GetAllUserDecksForAllGamesHandler(DataContext dataContext,
        IMapper mapper, SignInManager<User> signInManager)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _signInManager = signInManager;
    }

    public async Task<Response<List<DeckDisplayDto>>> Handle(GetAllUserDecksForAllGamesQuery query, CancellationToken cancellationToken)
    {
        var user = await _signInManager.GetSignedInUserAsync();

        if (user is null) return Error.AsResponse<List<DeckDisplayDto>>("No user logged in", "user");

        var decks = await _dataContext.Set<Deck>()
            .AsNoTracking()
            .Where(x => x.UserId == user.Id)
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
            .ToListAsync(cancellationToken);

        var groupedCards = new List<DeckCardDisplayDto>();

        decks.ForEach(deck => {
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
        });

        var mappedDecks = _mapper.Map<List<DeckDisplayDto>>(decks);

        mappedDecks.ForEach(deck => {
            var cards = groupedCards.Where(x => x.DeckId == deck.Id).ToList();
            if (cards is not null) deck?.Cards?.AddRange(cards);
            deck.Cards = deck?.Cards?.OrderBy(y => y.CardDisplay.Name).ToList();
        });

        return mappedDecks.AsResponse();
    }
}
