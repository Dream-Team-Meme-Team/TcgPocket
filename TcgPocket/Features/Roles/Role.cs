using Microsoft.AspNetCore.Identity;
using TcgPocket.Features.UserRoles;
using TcgPocket.Shared.Interfaces;

namespace TcgPocket.Features.Roles;

public class Role : IdentityRole<int>, IIdentifiable
{
    public List<UserRole> UserRoles { get; set; }
}

public class RoleGetDto : RoleDto
{
    public int Id { get; set; }
}

public class RoleDto
{
    public string Name { get; set; }
}