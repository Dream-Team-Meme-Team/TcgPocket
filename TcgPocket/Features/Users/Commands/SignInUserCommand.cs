using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Features.Users.Dtos;
using TcgPocket.Shared;

namespace TcgPocket.Features.Users.Commands;

public class SignInUserCommand: IRequest<Response<UserGetDto>>
{
    public SignInUserDto Data { get; set; }
}

public class SignInUserCommandHandler : IRequestHandler<SignInUserCommand, Response<UserGetDto>>
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly IMapper _mapper;

    public SignInUserCommandHandler(UserManager<User> userManager,
        SignInManager<User> signInManager,
        IMapper mapper)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _mapper = mapper;
    }
    
    public async Task<Response<UserGetDto>> Handle(SignInUserCommand request, CancellationToken c)
    {
        var normalizedUserName = _userManager.NormalizeName(request.Data.UserName);
        
        var user = await _userManager
            .Users
            .Include(x => x.UserRoles)
            .ThenInclude(x => x.Role)
            .FirstOrDefaultAsync(x => x.NormalizedUserName == normalizedUserName, c);
        
        if (user is null) return Error.AsResponse<UserGetDto>("Username or password is incorrect");

        var result = await _signInManager.PasswordSignInAsync(user, request.Data.Password, true, false);
        
        if (!result.Succeeded) return Error.AsResponse<UserGetDto>("Username or password is incorrect");
        if (result.IsNotAllowed)  return Error.AsResponse<UserGetDto>("User is not allowed to sign in");
        if (result.IsLockedOut) return Error.AsResponse<UserGetDto>("User is locked out");

        if (result.RequiresTwoFactor)
        {
            //TODO: Implement 2FA
            return Error.AsResponse<UserGetDto>("2FA not implemented 💔");
        }

        return _mapper.Map<UserGetDto>(user).AsResponse();
    }
}