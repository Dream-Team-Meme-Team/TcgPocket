using AutoMapper;

namespace TcgPocket.Features.Sets;

public class SetMapper : Profile
{
    public SetMapper()
    {
        CreateMap<Set, SetGetDto>();
        CreateMap<Set, SetDto>().ReverseMap();
    }
}