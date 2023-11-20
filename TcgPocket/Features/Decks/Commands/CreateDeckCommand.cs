using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Features.Users;
using TcgPocket.Shared;

namespace TcgPocket.Features.Decks.Commands;

public class CreateDeckCommand : IRequest<Response<DeckDetailDto>>
{
    public DeckDto Deck { get; set; }
}

public class CreateDeckCommandHandler : IRequestHandler<CreateDeckCommand, Response<DeckDetailDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<CreateDeckCommand> _validator;

    public CreateDeckCommandHandler(DataContext dataContext, IValidator<CreateDeckCommand> validator, IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
    }

    public async Task<Response<DeckDetailDto>> Handle(CreateDeckCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<DeckDetailDto> { Errors = errors };
        }

        if (!await _dataContext.Set<User>().AnyAsync(x => x.Id == command.Deck.UserId, cancellationToken))
        {
            return Error.AsResponse<DeckDetailDto>("User not found", "userId");
        }

        var deck = _mapper.Map<Deck>(command.Deck);
        await _dataContext.Set<Deck>().AddAsync(deck, cancellationToken);
        await _dataContext.SaveChangesAsync(cancellationToken);

        return _mapper.Map<DeckDetailDto>(deck).AsResponse();
    }
}