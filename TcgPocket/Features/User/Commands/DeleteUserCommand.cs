using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Users.Commands;

public class DeleteUserCommand : IRequest<Response>
{
    public int Id { get; set; }
}

public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, Response>
{
    private readonly DataContext _dataContext;
    private readonly IValidator<DeleteUserCommand> _validator;
    private readonly IMapper _mapper;

    public DeleteUserCommandHandler(DataContext dataContext,
        IValidator<DeleteUserCommand> validator,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _validator = validator;
        _mapper = mapper;
    }
    public async Task<Response> Handle(DeleteUserCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response { Errors = errors };
        }

        var user = await _dataContext.Set<User>()
            .FirstOrDefaultAsync(x => x.Id == command.Id, cancellationToken);

        if (user is null) return Error.AsResponse("User not found", "id");

        _dataContext.Set<User>().Remove(user);
        await _dataContext.SaveChangesAsync(cancellationToken);

        return Response.Success;
    }
}