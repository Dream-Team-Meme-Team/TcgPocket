using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Roles.Commands;

public class CreateRoleCommand : IRequest<Response<RoleGetDto>>
{
    public RoleDto Role { get; set; }
}

public class CreateRoleCommandHandler : IRequestHandler<CreateRoleCommand, Response<RoleGetDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<CreateRoleCommand> _validator;
    private readonly RoleManager<Role> _roleManager;

    public CreateRoleCommandHandler(DataContext dataContext,
        IValidator<CreateRoleCommand> validator,
        RoleManager<Role> roleManager,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
        _roleManager = roleManager;
    }

    public async Task<Response<RoleGetDto>> Handle(CreateRoleCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<RoleGetDto> { Errors = errors };
        }

        var role = _mapper.Map<Role>(command.Role);

        var result = await _roleManager.CreateAsync(role);

        if (!result.Succeeded)
        {
            var errors = _mapper.Map<List<Error>>(result.Errors);
            return new Response<RoleGetDto> { Errors = errors };
        }

        await _dataContext.SaveChangesAsync(cancellationToken);

        return _mapper.Map<RoleGetDto>(role).AsResponse();
    }
}