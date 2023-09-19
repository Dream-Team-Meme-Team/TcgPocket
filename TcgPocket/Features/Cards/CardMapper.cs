using AutoMapper;
using TcgPocket.Features.CardAttributes;

namespace TcgPocket.Features.Cards
{
    public class CardMapper : Profile
    {
        public CardMapper() 
        {
            CreateMap<Card, CardGetDto>();

            CreateMap<CardDto, Card>()
                .ForMember(x => x.Id, y => y.Ignore())
                .ForMember(dest => dest.CardAttributes, opts => 
                    opts.MapFrom(src => src.Attributes.Select(x => x.CardAttributes)))
                .ReverseMap();
        }
    }
}
