using AutoMapper;
using TcgPocket.Features.Users.Dtos;

namespace TcgPocket.Features.Users;

public class UserMapper : Profile
{
    public UserMapper()
    {
        CreateMap<User, UserGetDto>()
            .ForMember(dest => dest.Roles, opts =>
                opts.MapFrom(src => src.UserRoles.Select(x => x.Role)
            ));
        CreateMap<User, UserDto>().ReverseMap();

        CreateMap<User, UserRoleDto>()
            .ForMember(dest => dest.Roles, opts => 
                opts.MapFrom(src => src.UserRoles.Select(x => x.Role)
            ));
    }
}