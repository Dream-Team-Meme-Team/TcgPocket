namespace TcgPocket.Features.Users.Dtos;

public class UserCreateDto: UserDto
{
    public string Password { get; set; }
    public string ConfirmPassword { get; set; }
}