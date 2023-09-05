using Microsoft.AspNetCore.Identity;
using TcgPocket.Features.UserRoles;

namespace TcgPocket.Features.Roles;

public class Role : IdentityRole<int>
{
    public List<UserRole> UserRoles { get; set; }
}