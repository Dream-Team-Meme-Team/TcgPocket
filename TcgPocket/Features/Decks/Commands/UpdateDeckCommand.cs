using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Features.Users;
using TcgPocket.Shared;

namespace TcgPocket.Features.Decks.Commands;

public class UpdateDeckCommand : IRequest<Response<DeckGetDto>>
{
    public int Id { get; set; }
    public DeckDto Deck { get; set; }
}

public class UpdateDeckCommandHandler : IRequestHandler<UpdateDeckCommand, Response<DeckGetDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<UpdateDeckCommand> _validator;

    public UpdateDeckCommandHandler(DataContext dataContext,
        IValidator<UpdateDeckCommand> validator,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
    }

    public async Task<Response<DeckGetDto>> Handle(UpdateDeckCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<DeckGetDto> { Errors = errors };
        }

        if (!await _dataContext.Set<User>().AnyAsync(x => x.Id == command.Deck.UserId, cancellationToken))
        {
            return Error.AsResponse<DeckGetDto>("User not found", "id");
        }

        var deck = await _dataContext.Set<Deck>()
            .FirstOrDefaultAsync(x => x.Id == command.Id, cancellationToken);

        if (deck is null) return Error.AsResponse<DeckGetDto>("Deck not found", "id");

        _mapper.Map(command.Deck, deck);
        await _dataContext.SaveChangesAsync(cancellationToken);

        return _mapper.Map<DeckGetDto>(deck).AsResponse();
    }
}