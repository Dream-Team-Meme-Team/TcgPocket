using TcgPocket.Features.Roles;

namespace TcgPocket.Features.Users.Dtos;

public class UserRoleDto : UserGetDto
{
    public List<RoleGetDto> Roles { get; set; }
}