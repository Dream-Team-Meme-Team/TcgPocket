using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TcgPocket.Shared;

namespace TcgPocket.Features.Roles.Queries;

public class GetAllRolesQuery : IRequest<Response<List<Role>>>
{
}

public class GetAllRolesQueryHandler : IRequestHandler<GetAllRolesQuery, Response<List<Role>>>
{
    private readonly RoleManager<Role> _roleManager;
    private readonly IMapper _mapper;

    public GetAllRolesQueryHandler(RoleManager<Role> roleManager,
        IMapper mapper)
    {
        _roleManager = roleManager;
        _mapper = mapper;
    }

    public async Task<Response<List<Role>>> Handle(GetAllRolesQuery query, CancellationToken cancellationToken)
    {
        var roles = await _roleManager.Roles.ToListAsync(cancellationToken);

        if (roles.IsNullOrEmpty()) return Error.AsResponse<List<Role>>("Roles not found");

        return _mapper.Map<List<Role>>(roles).AsResponse();
    }
}