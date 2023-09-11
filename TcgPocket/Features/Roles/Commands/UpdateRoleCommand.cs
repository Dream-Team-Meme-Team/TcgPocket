using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Roles.Commands;

public class UpdateRoleCommand : IRequest<Response<RoleGetDto>>
{
    public int Id { get; set; }
    public RoleDto Role { get; set; }
}

public class UpdateRoleCommandHandler : IRequestHandler<UpdateRoleCommand, Response<RoleGetDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<UpdateRoleCommand> _validator;
    private readonly RoleManager<Role> _roleManager;

    public UpdateRoleCommandHandler(DataContext dataContext,
        IValidator<UpdateRoleCommand> validator,
        RoleManager<Role> roleManager,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
        _roleManager = roleManager;
    }

    public async Task<Response<RoleGetDto>> Handle(UpdateRoleCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<RoleGetDto> { Errors = errors };
        }

        var role = _roleManager.Roles.SingleOrDefault(x => x.Id == command.Id);

        if (role is null)
        {
            return Error.AsResponse<RoleGetDto>("Role not found", "id");
        }

        _mapper.Map(command.Role, role);
        var result = await _roleManager.UpdateAsync(role);

        if (!result.Succeeded)
        {
            var errors = _mapper.Map<List<Error>>(result.Errors);
            return new Response<RoleGetDto> { Errors = errors };
        }

        await _dataContext.SaveChangesAsync(cancellationToken);

        return _mapper.Map<RoleGetDto>(role).AsResponse();
    }
}