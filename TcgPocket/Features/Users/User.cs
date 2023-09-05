using Microsoft.AspNetCore.Identity;
using TcgPocket.Features.Decks;
using TcgPocket.Features.UserRoles;
using TcgPocket.Shared.Interfaces;

namespace TcgPocket.Features.Users;

public class User : IdentityUser<int>, IIdentifiable
{
    public List<Deck> Decks { get; set; }
    public List<UserRole> UserRoles { get; set; }
}

public class UserGetDto : UserDto
{
    public int Id { get; set; }
}

public class UserCreateUpdateDto: UserDto
{
    public string Password { get; set; }
}

public class UserDto
{
    public string UserName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
}