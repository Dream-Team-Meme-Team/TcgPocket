using AutoMapper;

namespace TcgPocket.Features.Users;

public class UserMapper : Profile
{
    public UserMapper()
    {
        CreateMap<User, UserGetDto>();
        CreateMap<User, UserDto>().ReverseMap();
    }
}