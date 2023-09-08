using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using TcgPocket.Features.Roles;
using TcgPocket.Shared;

namespace TcgPocket.Features.Users.Queries;

public class GetAllRolesByUserIdQuery : IRequest<Response<List<RoleGetDto>>>
{
    public int UserId { get; set; }
}

public class GetAllRolesByUserIdQueryHandler : IRequestHandler<GetAllRolesByUserIdQuery, Response<List<RoleGetDto>>>
{
    private readonly UserManager<User> _userManager;
    private readonly IMapper _mapper;

    public GetAllRolesByUserIdQueryHandler(UserManager<User> userManager,
        IMapper mapper)
    {
        _userManager = userManager;
        _mapper = mapper;
    }

    public async Task<Response<List<RoleGetDto>>> Handle(GetAllRolesByUserIdQuery query, CancellationToken cancellationToken)
    {
        var user = _userManager.Users.SingleOrDefault(x => x.Id == query.UserId);

        if (user is null)
        {
            return Error.AsResponse<List<RoleGetDto>>("User not found", "id");
        }

        var roles = await _userManager.GetRolesAsync(user);

        if (roles.IsNullOrEmpty()) return Error.AsResponse<List<RoleGetDto>>("Roles not found");

        return _mapper.Map<List<RoleGetDto>>(roles).AsResponse();
    }
}