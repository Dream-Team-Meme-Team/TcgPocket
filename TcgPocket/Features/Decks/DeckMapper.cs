using AutoMapper;

namespace TcgPocket.Features.Decks;

public class DeckMapper : Profile
{
    public DeckMapper()
    {
        CreateMap<Deck, DeckGetDto>();
        CreateMap<Deck, DeckDto>().ReverseMap();
        CreateMap<CreateDeckDto, Deck>()
            .ForMember(x => x.UserId, opts => opts.Ignore());
        CreateMap<Deck, UpdateDeckDto>()
            .ForMember(x => x.Cards, opts => opts.Ignore())
            .ReverseMap();
        CreateMap<Deck, DeckDetailDto>()
            .ForMember(x => x.Cards, opts => opts.MapFrom(x => x.DeckCards.Select(x => x.Card).ToList()))
            .ReverseMap();
        CreateMap<Deck, DeckDisplayDto>()
            .ForMember(x => x.Game, opts => opts.MapFrom(x => x.Game))
            .ForMember(x => x.Cards, opts => opts.Ignore())
            .ReverseMap();
        CreateMap<DeckGetDto, DeckDisplayDto>()
            .ReverseMap();
    }
}