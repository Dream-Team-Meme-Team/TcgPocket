using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
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
    private readonly UserManager<User> _userManager;
    private readonly IMapper _mapper;

    public DeleteUserCommandHandler(DataContext dataContext,
        IValidator<DeleteUserCommand> validator,
        UserManager<User> userManager,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _validator = validator;
        _userManager = userManager;
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

        var user = _userManager.Users.SingleOrDefault(x => x.Id == command.Id);

        if (user is null)
        {
            return Error.AsResponse("User not found", "userId");
        }

        var result = await _userManager.DeleteAsync(user);

        if (!result.Succeeded)
        {
            var errors = _mapper.Map<List<Error>>(result.Errors);
            return new Response{Errors = errors};
        }

        await _dataContext.SaveChangesAsync(cancellationToken);

        return Response.Success;
    }
}