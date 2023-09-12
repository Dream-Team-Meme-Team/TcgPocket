using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Features.Roles;
using TcgPocket.Features.Users.Dtos;
using TcgPocket.Shared;

namespace TcgPocket.Features.Users.Commands;

public class AddRoleToUserCommand : IRequest<Response<UserRoleDto>>
{
    public int Id { get; set; }
    public RoleDto Role { get; set; }
}

public class AddRoleToUserCommandHandler : IRequestHandler<AddRoleToUserCommand, Response<UserRoleDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<AddRoleToUserCommand> _validator;
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<Role> _roleManager;

    public AddRoleToUserCommandHandler(DataContext dataContext,
        IValidator<AddRoleToUserCommand> validator,
        UserManager<User> userManager,
        RoleManager<Role> roleManager,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task<Response<UserRoleDto>> Handle(AddRoleToUserCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<UserRoleDto> { Errors = errors };
        }

        var user = _userManager.Users
            .Include(x => x.UserRoles)
            .ThenInclude(x => x.Role)
            .SingleOrDefault(x => x.Id == command.Id);

        if (user is null)
        {
            return Error.AsResponse<UserRoleDto>("User not found", "id");
        }

        var roleExists = await _roleManager.RoleExistsAsync(command.Role.Name);

        if (!roleExists)
        {
            return Error.AsResponse<UserRoleDto>("Role does not exist", "roleName");
        }

        var result = await _userManager.AddToRoleAsync(user, command.Role.Name);

        if (!result.Succeeded)
        {
            var errors = _mapper.Map<List<Error>>(result.Errors);
            return new Response<UserRoleDto> { Errors = errors };
        }

        await _dataContext.SaveChangesAsync(cancellationToken);

        return _mapper.Map<UserRoleDto>(user).AsResponse();
    }
}