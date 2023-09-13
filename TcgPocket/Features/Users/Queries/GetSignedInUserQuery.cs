using AutoMapper;
using MediatR;
using TcgPocket.Shared;

namespace TcgPocket.Features.Users.Queries;

public class GetSignedInUserQuery : IRequest<Response<UserGetDto>>
{
}

public class GetSignedInUserQueryHandler : IRequestHandler<GetSignedInUserQuery, Response<UserGetDto>>
{
    private readonly CurrentUserManager _currentUserManager;
    private readonly IMapper _mapper;

    public GetSignedInUserQueryHandler(CurrentUserManager currentUserManager,
        IMapper mapper)
    {
        _currentUserManager = currentUserManager;
        _mapper = mapper;
    }
    
    public async Task<Response<UserGetDto>> Handle(GetSignedInUserQuery request, CancellationToken cancellationToken)
    {
        var user = await _currentUserManager.GetCurrentUserAsync();

        return user is null 
            ? new Response<UserGetDto>{Data = null} 
            : _mapper.Map<UserGetDto>(user).AsResponse();
    }
}