using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using TcgPocket.Shared;

namespace TcgPocket.Features.Users.Queries;

public class GetSignedInUserQuery : IRequest<Response<UserGetDto>>
{
}

public class GetSignedInUserQueryHandler : IRequestHandler<GetSignedInUserQuery, Response<UserGetDto>>
{
    private readonly SignInManager<User> _signInManager;
    private readonly IMapper _mapper;

    public GetSignedInUserQueryHandler(SignInManager<User> signInManager,
        IMapper mapper)
    {
        _signInManager = signInManager;
        _mapper = mapper;
    }
    
    public async Task<Response<UserGetDto>> Handle(GetSignedInUserQuery request, CancellationToken cancellationToken)
    {
        var user = await _signInManager.GetSignedInUserAsync();

        return user is null 
            ? new Response<UserGetDto>{Data = null} 
            : _mapper.Map<UserGetDto>(user).AsResponse();
    }
}