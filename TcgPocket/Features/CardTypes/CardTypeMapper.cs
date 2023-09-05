using AutoMapper;

namespace TcgPocket.Features.CardTypes;

public class CardTypeMapper : Profile
{
    public CardTypeMapper()
    {
        CreateMap<CardType, CardTypeGetDto>();
        CreateMap<CardType, CardTypeDto>().ReverseMap();
    }
}
