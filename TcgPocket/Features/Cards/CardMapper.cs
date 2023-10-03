using AutoMapper;
using TcgPocket.Features.Cards.Dtos;
using TcgPocket.Shared.PagedResult;

namespace TcgPocket.Features.Cards
{
    public class CardMapper : Profile
    {
        public CardMapper() 
        {
            CreateMap<Card, CardGetDto>();

            CreateMap<CardDto, Card>()
                .ForMember(x => x.Id, y => y.Ignore());

            CreateMap<PagedResult<Card>, PagedResult<CardGetDto>>();

            CreateMap<Card, PagedResult<CardDisplayDto>>();

            CreateMap<Card, CardDisplayDto>()
                .ForMember(dest => dest.Game, src => src.MapFrom(x => x.Game))
                .ForMember(dest => dest.CardType, src => src.MapFrom(x => x.CardType))
                .ForMember(dest => dest.Rarity, src => src.MapFrom(x => x.Rarity))
                .ForMember(dest => dest.Set, src => src.MapFrom(x => x.Set));

        }
    }
}
