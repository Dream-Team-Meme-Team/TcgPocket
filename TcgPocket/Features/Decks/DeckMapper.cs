using AutoMapper;

namespace TcgPocket.Features.Decks;

public class DeckMapper : Profile
{
    public DeckMapper()
    {
        CreateMap<Deck, DeckGetDto>();
        CreateMap<Deck, DeckDto>().ReverseMap();
    }
}