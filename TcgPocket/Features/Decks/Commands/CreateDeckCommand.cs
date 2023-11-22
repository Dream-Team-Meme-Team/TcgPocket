using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Features.Users;
using TcgPocket.Shared;

namespace TcgPocket.Features.Decks.Commands;

public class CreateDeckCommand : IRequest<Response<DeckDetailDto>>
{   
    public CreateDeckDto Deck { get; set; }
}

public class CreateDeckCommandHandler : IRequestHandler<CreateDeckCommand, Response<DeckDetailDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<CreateDeckCommand> _validator;
    private readonly SignInManager<User> _signInManager;

    public CreateDeckCommandHandler(DataContext dataContext, IValidator<CreateDeckCommand> validator, IMapper mapper,
        SignInManager<User> signInManager)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
        _signInManager = signInManager;
    }

    public async Task<Response<DeckDetailDto>> Handle(CreateDeckCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);
        var user = await _signInManager.GetSignedInUserAsync();

        if (user is null)
        {
            return Error.AsResponse<DeckDetailDto>("Please log in to create a deck.", "user");
        }

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<DeckDetailDto> { Errors = errors };
        }

        var deck = _mapper.Map<Deck>(command.Deck);
        deck.UserId = user.Id;
        await _dataContext.Set<Deck>().AddAsync(deck, cancellationToken);
        await _dataContext.SaveChangesAsync(cancellationToken);

        return _mapper.Map<DeckDetailDto>(deck).AsResponse();
    }
}