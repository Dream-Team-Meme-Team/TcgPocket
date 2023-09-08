using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TcgPocket.Shared;

namespace TcgPocket.Features.Roles.Queries;

public class GetAllRolesQuery : IRequest<Response<List<IdentityRole<int>>>>
{
}

public class GetAllRolesQueryHandler : IRequestHandler<GetAllRolesQuery, Response<List<IdentityRole<int>>>>
{
    private readonly RoleManager<IdentityRole<int>> _userManager;
    private readonly IMapper _mapper;

    public GetAllRolesQueryHandler(RoleManager<IdentityRole<int>> userManager,
        IMapper mapper)
    {
        _userManager = userManager;
        _mapper = mapper;
    }

    public async Task<Response<List<IdentityRole<int>>>> Handle(GetAllRolesQuery query, CancellationToken cancellationToken)
    {
        var users = await _userManager.Roles.ToListAsync(cancellationToken);

        if (users.IsNullOrEmpty()) return Error.AsResponse<List<IdentityRole<int>>>("Roles not found");

        return _mapper.Map<List<IdentityRole<int>>>(users).AsResponse();
    }
}