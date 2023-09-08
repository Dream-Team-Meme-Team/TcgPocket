using AutoMapper;
using TcgPocket.Features.Users.Dtos;

namespace TcgPocket.Features.Roles;

public class RoleMapper : Profile
{
    public RoleMapper()
    {
        CreateMap<Role, RoleGetDto>();
        CreateMap<Role, RoleDto>().ReverseMap();

        CreateMap<Role, UserRoleDto>();
    }
}