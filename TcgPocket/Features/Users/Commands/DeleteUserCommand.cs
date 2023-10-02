using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using TcgPocket.Data;
using TcgPocket.Features.Users.Dtos;
using TcgPocket.Shared;

namespace TcgPocket.Features.Users.Commands;

public class DeleteUserCommand : IRequest<Response>
{
    public UserDeleteDto DeleteDto { get; set; }
}

public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, Response>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<DeleteUserCommand> _validator;
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;

    public DeleteUserCommandHandler(DataContext dataContext,
        IMapper mapper,
        IValidator<DeleteUserCommand> validator,
        UserManager<User> userManager,
        SignInManager<User> signInManager
        )
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
        _userManager = userManager;
        _signInManager = signInManager;
    }
    public async Task<Response> Handle(DeleteUserCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response { Errors = errors };
        }

        var user = await _signInManager.GetSignedInUserAsync();

        if (user is null)
        {
            return Error.AsResponse("Unable to determine User", "user");
        }

        var correctPassword = await _userManager
            .CheckPasswordAsync(user, command.DeleteDto.Password);

        if(!correctPassword)
        {
            return Error.AsResponse("Unable to delete account.", "user");
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