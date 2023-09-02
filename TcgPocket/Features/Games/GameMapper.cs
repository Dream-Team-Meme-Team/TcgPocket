using AutoMapper;
using TcgPocket.Features.Games.Commands;

namespace TcgPocket.Features.Games;

public class GameMapper : Profile
{
    public GameMapper()
    {
        CreateMap<Game, GameGetDto>();
        CreateMap<Game, GameDto>().ReverseMap();
        CreateMap<CreateGameRequest, Game>().ReverseMap();
    }
}