using MediatR;
using Microsoft.AspNetCore.Identity;
using TcgPocket.Shared;

namespace TcgPocket.Features.Users.Commands;

public class SignOutUserCommand : IRequest<Response>
{
}

public class SignOutUserCommandHandler : IRequestHandler<SignOutUserCommand, Response>
{
    private readonly SignInManager<User> _signInManager;

    public SignOutUserCommandHandler(SignInManager<User> signInManager)
    {
        _signInManager = signInManager;
    }

    public async Task<Response> Handle(SignOutUserCommand request, CancellationToken cancellationToken)
    {
        await _signInManager.SignOutAsync();

        return Response.Success;
    }
}