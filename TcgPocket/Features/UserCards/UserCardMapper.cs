using AutoMapper;

namespace TcgPocket.Features.UserCards;

public class UserCardMapper : Profile
{
    public UserCardMapper()
    {
        CreateMap<UserCard, UserCardGetDto>();
        CreateMap<UserCard, UserCardDto>().ReverseMap();
    }
}
