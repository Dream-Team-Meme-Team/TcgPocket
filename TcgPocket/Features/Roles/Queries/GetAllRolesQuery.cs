using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Shared;

namespace TcgPocket.Features.Roles.Queries;

public class GetAllRolesQuery : IRequest<Response<List<RoleGetDto>>>
{
}

public class GetAllRolesQueryHandler : IRequestHandler<GetAllRolesQuery, Response<List<RoleGetDto>>>
{
    private readonly RoleManager<Role> _roleManager;
    private readonly IMapper _mapper;

    public GetAllRolesQueryHandler(RoleManager<Role> roleManager,
        IMapper mapper)
    {
        _roleManager = roleManager;
        _mapper = mapper;
    }

    public async Task<Response<List<RoleGetDto>>> Handle(GetAllRolesQuery query, CancellationToken cancellationToken)
    {
        var roles = await _roleManager.Roles.ToListAsync(cancellationToken);

        return _mapper.Map<List<RoleGetDto>>(roles).AsResponse();
    }
}