using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using TcgPocket.Data;
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
        var user = await _signInManager.GetSignedInUserAsync();
        var errors = new List<Error>();

        var sqlCommand = @"
                DELETE FROM DeckCards
                WHERE CardId IN (SELECT value FROM STRING_SPLIT(@cardIds, ','))
                AND DeckId = @deckId";

        if (user is null) errors.Add(new Error { Message = "Please sign-in.", Property = "user" });

        if (!validationResult.IsValid)
        {
            errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<DeckDetailDto> { Errors = errors };
        }

        if (!await _dataContext.Set<User>().AnyAsync(x => x.Id == command.Deck.UserId, cancellationToken))
        {
            return Error.AsResponse<DeckDetailDto>("User not found", "id");
        }

        var deck = await _dataContext.Set<Deck>()
            .FirstOrDefaultAsync(x => x.Id == command.Id, cancellationToken);

        if (deck is null) return Error.AsResponse<DeckDetailDto>("Deck not found", "id");

        if (user is not null && user.Id != deck.UserId) errors.Add(new Error { Message = "Deck not found for current user.", Property = "userId" });


        if (command.Deck.Cards.Any())
        {
            var cardIds = command.Deck.Cards?.Select(x => x.Id).ToList();

            await _dataContext.Database.ExecuteSqlRawAsync(sqlCommand, new SqlParameter("@cardIds", string.Join(",", cardIds)),
                new SqlParameter("@deckId", command.Id));
        }

        foreach (var card in command.Deck.Cards)
        {
            if (card.GameId != command.Deck.GameId)
            {
                errors.Add(new Error { Message = $"Card with Id: '{card.Id}' does not match the Decks associated Game", Property = "cardId" });
            }
        }

        if (errors.Any()) return new Response<DeckDetailDto> { Errors = errors };

        var deckCards = command.Deck.Cards.Select(x => new DeckCard
        {
            CardId = x.Id,
            Deck = deck
        })
        .ToList();

        deck.DeckCards = deckCards;

        _mapper.Map(command.Deck, deck);
        await _dataContext.SaveChangesAsync(cancellationToken);

        return _mapper.Map<DeckDetailDto>(deck).AsResponse();
    }
}