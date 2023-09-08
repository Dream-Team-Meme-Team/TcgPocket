using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Roles.Commands;

public class CreateRoleCommand : IRequest<Response<IdentityRole<int>>>
{
    public string RoleName { get; set; }
}

public class CreateRoleCommandHandler : IRequestHandler<CreateRoleCommand, Response<IdentityRole<int>>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<CreateRoleCommand> _validator;
    private readonly RoleManager<IdentityRole<int>> _userManager;

    public CreateRoleCommandHandler(DataContext dataContext,
        IValidator<CreateRoleCommand> validator,
        RoleManager<IdentityRole<int>> userManager,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
        _userManager = userManager;
    }

    public async Task<Response<IdentityRole<int>>> Handle(CreateRoleCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<IdentityRole<int>> { Errors = errors };
        }

        var role = new IdentityRole<int>();

        role.Name = command.RoleName;

        var result = await _userManager.CreateAsync(role);

        if (!result.Succeeded)
        {
            var errors = _mapper.Map<List<Error>>(result.Errors);
            return new Response<IdentityRole<int>> { Errors = errors };
        }

        await _dataContext.SaveChangesAsync(cancellationToken);

        return role.AsResponse();
    }
}