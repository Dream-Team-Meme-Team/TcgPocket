using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Decks.Commands;

public class DeleteDeckCommand : IRequest<Response>
{
    public int Id { get; set; }
}

public class DeleteDeckCommandHandler : IRequestHandler<DeleteDeckCommand, Response>
{
    private readonly DataContext _dataContext;
    private readonly IValidator<DeleteDeckCommand> _validator;
    private readonly IMapper _mapper;

    public DeleteDeckCommandHandler(DataContext dataContext,
        IValidator<DeleteDeckCommand> validator,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _validator = validator;
        _mapper = mapper;
    }
    public async Task<Response> Handle(DeleteDeckCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response { Errors = errors };
        }

        var deck = await _dataContext.Set<Deck>()
            .FirstOrDefaultAsync(x => x.Id == command.Id, cancellationToken);

        if (deck is null) return Error.AsResponse("Deck not found", "id");

        _dataContext.Set<Deck>().Remove(deck);
        await _dataContext.SaveChangesAsync(cancellationToken);

        return Response.Success;
    }
}