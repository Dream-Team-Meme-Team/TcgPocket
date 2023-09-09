using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Roles.Commands;

public class DeleteRoleCommand : IRequest<Response>
{
    public int Id { get; set; }
}

public class DeleteRoleCommandHandler : IRequestHandler<DeleteRoleCommand, Response>
{
    private readonly DataContext _dataContext;
    private readonly IValidator<DeleteRoleCommand> _validator;
    private readonly RoleManager<Role> _roleManager;
    private readonly IMapper _mapper;

    public DeleteRoleCommandHandler(DataContext dataContext,
        IValidator<DeleteRoleCommand> validator,
        RoleManager<Role> roleManager,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _validator = validator;
        _roleManager = roleManager;
        _mapper = mapper;
    }
    
    public async Task<Response> Handle(DeleteRoleCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response { Errors = errors };
        }

        var role = _roleManager.Roles.SingleOrDefault(x => x.Id == command.Id);

        if (role is null)
        {
            return Error.AsResponse("Role not found", "id");
        }

        var result = await _roleManager.DeleteAsync(role);

        if (!result.Succeeded)
        {
            var errors = _mapper.Map<List<Error>>(result.Errors);
            return new Response { Errors = errors };
        }

        await _dataContext.SaveChangesAsync(cancellationToken);

        return Response.Success;
    }
}