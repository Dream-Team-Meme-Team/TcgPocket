using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Users.Queries;

public class GetAllUsersQuery : IRequest<Response<List<UserGetDto>>>
{
}

public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, Response<List<UserGetDto>>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public GetAllUsersQueryHandler(DataContext dataContext,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
    }

    public async Task<Response<List<UserGetDto>>> Handle(GetAllUsersQuery query, CancellationToken cancellationToken)
    {
        var user = await _dataContext.Set<User>()
            .ToListAsync(cancellationToken: cancellationToken);

        if (user.IsNullOrEmpty()) return Error.AsResponse<List<UserGetDto>>("Users not found");

        return _mapper.Map<List<UserGetDto>>(user).AsResponse();
    }
}