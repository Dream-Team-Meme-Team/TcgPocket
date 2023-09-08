using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using TcgPocket.Data;
using TcgPocket.Features.Users;
using TcgPocket.Shared;

namespace TcgPocket.Features.UserRoles.Commands;

public class CreateUserRoleCommand : IRequest<Response>
{
    public int UserId { get; set; }
    public int RoleId { get; set; }
}

public class CreateUserRoleCommandHandler : IRequestHandler<CreateUserRoleCommand, Response>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<CreateUserRoleCommand> _validator;
    private readonly UserManager<User> _userManager;

    public CreateUserRoleCommandHandler(DataContext dataContext,
        IValidator<CreateUserRoleCommand> validator,
        UserManager<User> userManager,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
        _userManager = userManager;
    }

    public async Task<Response> Handle(CreateUserRoleCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response { Errors = errors };
        }

        var user = _userManager.Users.SingleOrDefault(x => x.Id == command.UserId);

        var result = await _userManager.AddToRoleAsync(user, "string");

        if (!result.Succeeded)
        {
            var errors = _mapper.Map<List<Error>>(result.Errors);
            return new Response { Errors = errors };
        }

        await _dataContext.SaveChangesAsync(cancellationToken);

        return Response.Success;
    }
}