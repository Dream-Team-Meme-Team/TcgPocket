using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Features.Cards;
using TcgPocket.Features.DeckCards;
using TcgPocket.Features.Users;
using TcgPocket.Shared;

namespace TcgPocket.Features.Decks.Commands;

public class UpdateDeckCommand : IRequest<Response<DeckDetailDto>>
{
    public int Id { get; set; }
    public UpdateDeckDto Deck { get; set; }
}

public class UpdateDeckCommandHandler : IRequestHandler<UpdateDeckCommand, Response<DeckDetailDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<UpdateDeckCommand> _validator;
    private readonly SignInManager<User> _signInManager;

    public UpdateDeckCommandHandler(DataContext dataContext,
        IValidator<UpdateDeckCommand> validator,
        IMapper mapper, SignInManager<User> signInManager)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
        _signInManager = signInManager;
    }

    public async Task<Response<DeckDetailDto>> Handle(UpdateDeckCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<DeckDetailDto> { Errors = errors };
        }

        var user = await _signInManager.GetSignedInUserAsync();

        var sqlCommand = @"
                DELETE FROM DeckCards
                WHERE DeckId = @deckId";

        if (user is null)
        {
            return Error.AsResponse<DeckDetailDto>("Please log in to edit a deck.", "user");
        }

        var deck = await _dataContext.Set<Deck>()
            .FirstOrDefaultAsync(x => x.Id == command.Id, cancellationToken);

        if (deck is null) return Error.AsResponse<DeckDetailDto>("Deck not found", "id");
       
        if (user is not null && user.Id != deck.UserId) return Error.AsResponse<DeckDetailDto>("Deck not found for current user.", "userId");

        var cardIds = command.Deck.Cards.Select(x => x.Id).ToList();

        var hasMultipleCardGames = _dataContext.Set<Card>().Any(x => cardIds.Contains(x.Id) && x.GameId != command.Deck.GameId);

        if (hasMultipleCardGames)
        {
            return Error.AsResponse<DeckDetailDto>("Decks may only contain cards from the designated game", "cards");
        }

        if (command.Deck.Cards.Any())
        {
            await _dataContext.Database.ExecuteSqlRawAsync(sqlCommand, new SqlParameter("@deckId", command.Id));
        }

        var deckCards = command.Deck.Cards.Select(x => new DeckCard
        {
            CardId = x.Id,
            Deck = deck
        })
        .ToList();

        deck.DeckCards = deckCards;

        _mapper.Map(command.Deck, deck);
        await _dataContext.SaveChangesAsync(cancellationToken);

        var deckToReturn = await _dataContext.Set<Deck>()
            .Include(x => x.DeckCards)
            .ThenInclude(y => y.Card)
            .FirstOrDefaultAsync(x => x.Id == deck.Id);

        return _mapper.Map<DeckDetailDto>(deckToReturn).AsResponse();
    }
}