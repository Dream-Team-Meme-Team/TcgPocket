using AutoMapper;
using TcgPocket.Shared.PagedResult;

namespace TcgPocket.Features.Cards
{
    public class CardMapper : Profile
    {
        public CardMapper() 
        {
            CreateMap<Card, CardGetDto>();

            CreateMap<Card, CardDetailDto>()
                .ForMember(x => x.Attributes, opts => 
                    opts.MapFrom(src => src.CardAttributes));

            CreateMap<CardDto, Card>()
                .ForMember(x => x.Id, y => y.Ignore());

            CreateMap<PagedResult<Card>, PagedResult<CardDetailDto>>();

            CreateMap<Card, CreateCardDto>()
                .ForMember(x => x.Attributes, opts =>
                    opts.MapFrom(src => src.CardAttributes));
        }
    }
}
