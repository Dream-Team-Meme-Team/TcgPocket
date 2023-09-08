using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using TcgPocket.Data;
using TcgPocket.Features.Roles;
using TcgPocket.Features.Users;
using TcgPocket.Shared;

namespace TcgPocket.Features.UserRoles.Commands;

public class RemoveRoleFromUserCommand : IRequest<Response>
{
    public int UserId { get; set; }
    public String RoleName { get; set; }
}

public class RemoveRoleFromUserCommandHandler : IRequestHandler<RemoveRoleFromUserCommand, Response>
{
    private readonly DataContext _dataContext;
    private readonly IValidator<RemoveRoleFromUserCommand> _validator;
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<Role> _roleManager;
    private readonly IMapper _mapper;

    public RemoveRoleFromUserCommandHandler(DataContext dataContext,
        IValidator<RemoveRoleFromUserCommand> validator,
        UserManager<User> userManager,
        RoleManager<Role> roleManager,
    IMapper mapper)
    {
        _dataContext = dataContext;
        _validator = validator;
        _userManager = userManager;
        _roleManager = roleManager;
        _mapper = mapper;
    }
    public async Task<Response> Handle(RemoveRoleFromUserCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response { Errors = errors };
        }

        var user = _userManager.Users.SingleOrDefault(x => x.Id == command.UserId);

        if (user is null)
        {
            return Error.AsResponse("User not found", "id");
        }

        var roleExists = await _roleManager.RoleExistsAsync(command.RoleName);

        if (!roleExists)
        {
            return Error.AsResponse("Role does not exist", "roleName");
        }

        var result = await _userManager.RemoveFromRoleAsync(user, command.RoleName);

        if (!result.Succeeded)
        {
            var errors = _mapper.Map<List<Error>>(result.Errors);
            return new Response { Errors = errors };
        }

        await _dataContext.SaveChangesAsync(cancellationToken);

        return Response.Success;
    }
}