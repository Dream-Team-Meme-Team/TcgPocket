using Microsoft.AspNetCore.Identity;
using TcgPocket.Features.Decks;
using TcgPocket.Shared.Interfaces;

namespace TcgPocket.Features.Users;

public class User : IdentityUser<int>, IIdentifiable
{
    public List<Deck> Decks { get; set; }
    public virtual ICollection<IdentityUserClaim<int>> Claims { get; set; }
    public virtual ICollection<IdentityUserLogin<int>> Logins { get; set; }
    public virtual ICollection<IdentityUserToken<int>> Tokens { get; set; }
    public virtual ICollection<IdentityUserRole<int>> UserRoles { get; set; }
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