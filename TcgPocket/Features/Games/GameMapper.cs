using AutoMapper;

namespace TcgPocket.Features.Games;

public class GameMapper : Profile
{
    public GameMapper()
    {
        CreateMap<Game, GameGetDto>();
        CreateMap<Game, GameDto>().ReverseMap();
    }
}
