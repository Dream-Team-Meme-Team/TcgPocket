using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Sets.Commands;

public class DeleteSetCommand : IRequest<Response>
{
    public int Id { get; set; }
}

public class DeleteSetCommandHandler : IRequestHandler<DeleteSetCommand, Response>
{
    private readonly DataContext _dataContext;
    private readonly IValidator<DeleteSetCommand> _validator;
    private readonly IMapper _mapper;

    public DeleteSetCommandHandler(DataContext dataContext,
        IValidator<DeleteSetCommand> validator,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _validator = validator;
        _mapper = mapper;
    }
    public async Task<Response> Handle(DeleteSetCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response { Errors = errors };
        }

        var cardType = await _dataContext.Set<Set>()
            .FirstOrDefaultAsync(x => x.Id == command.Id, cancellationToken);

        if (cardType is null) return Error.AsResponse("Card Type not found", "id");

        _dataContext.Set<Set>().Remove(cardType);
        await _dataContext.SaveChangesAsync(cancellationToken);

        return Response.Success;
    }
}