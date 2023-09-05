using Microsoft.AspNetCore.Identity;
using TcgPocket.Features.Roles;
using TcgPocket.Features.Users;

namespace TcgPocket.Features.UserRoles;

public class UserRole : IdentityUserRole<int>
{
    public int Id { get; set; }
    public User User { get; set; }
    public Role Role { get; set; }
}