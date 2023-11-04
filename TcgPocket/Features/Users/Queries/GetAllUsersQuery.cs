using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Shared;

namespace TcgPocket.Features.Users.Queries;

public class GetAllUsersQuery : IRequest<Response<List<UserGetDto>>>
{
}

public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, Response<List<UserGetDto>>>
{
    private readonly UserManager<User> _userManager;
    private readonly IMapper _mapper;

    public GetAllUsersQueryHandler(UserManager<User> userManager,
        IMapper mapper)
    {
        _userManager = userManager;
        _mapper = mapper;
    }

    public async Task<Response<List<UserGetDto>>> Handle(GetAllUsersQuery query, CancellationToken cancellationToken)
    {
        var users = await _userManager.Users
            .Include(x => x.UserRoles)
            .ThenInclude(x => x.Role)
            .ToListAsync(cancellationToken);

        return _mapper.Map<List<UserGetDto>>(users).AsResponse();
    }
}