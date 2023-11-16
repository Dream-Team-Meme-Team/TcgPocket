using AutoMapper;

namespace TcgPocket.Features.Decks;

public class DeckMapper : Profile
{
    public DeckMapper()
    {
        CreateMap<Deck, DeckGetDto>();
        CreateMap<Deck, DeckDto>().ReverseMap();
        CreateMap<Deck, CreateUpdateDeckDto>()
            .ForMember(x => x.Cards, opts => opts.Ignore())
            .ReverseMap();
        CreateMap<Deck, DeckDetailDto>()
            .ForMember(x => x.Cards, opts => opts.MapFrom(x => x.DeckCards.Select(x => x.Card).ToList()))
            .ReverseMap();
    }
}