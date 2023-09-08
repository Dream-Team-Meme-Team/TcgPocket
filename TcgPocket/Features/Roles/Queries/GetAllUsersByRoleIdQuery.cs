using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using TcgPocket.Features.Roles;
using TcgPocket.Shared;

namespace TcgPocket.Features.Users.Queries;

public class GetAllUsersByRoleIdQuery : IRequest<Response<List<RoleGetDto>>>
{
    public int Id { get; set; }
}

public class GetAllUsersByRoleIdQueryHandler : IRequestHandler<GetAllUsersByRoleIdQuery, Response<List<RoleGetDto>>>
{
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<Role> _roleManager;
    private readonly IMapper _mapper;

    public GetAllUsersByRoleIdQueryHandler(UserManager<User> userManager,
        RoleManager<Role> roleManager,
        IMapper mapper)
    {
        _userManager = userManager;
        _mapper = mapper;
        _roleManager = roleManager;
    }

    public async Task<Response<List<RoleGetDto>>> Handle(GetAllUsersByRoleIdQuery query, CancellationToken cancellationToken)
    {
        var role = _roleManager.Roles.FirstOrDefault(x => x.Id == query.Id);

        if (role is null)
        {
            return Error.AsResponse<List<RoleGetDto>>("Role not found", "id");
        }
        
        var user = await _userManager.GetUsersInRoleAsync(role.Name);

        if (user.IsNullOrEmpty()) return Error.AsResponse<List<RoleGetDto>>("Users not found");

        return _mapper.Map<List<RoleGetDto>>(user).AsResponse();
    }
}