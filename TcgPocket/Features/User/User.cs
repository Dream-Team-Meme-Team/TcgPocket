using TcgPocket.Shared.Interfaces;

namespace TcgPocket.Features.Users;

public class User : UserGetDto, IEntity
{
}

public class UserGetDto : UserDto
{
    public int Id { get; set; }
}

public class UserDto
{
    public string Username { get; set; }
    public string Password { get; set; }
}