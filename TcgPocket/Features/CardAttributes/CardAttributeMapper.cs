using AutoMapper;
using TcgPocket.Features.CardAttributes.Dtos;

namespace TcgPocket.Features.CardAttributes
{
    public class CardAttributeMapper : Profile
    {
        public CardAttributeMapper() 
        {
            CreateMap<CardAttributeDto, CardAttribute>().ReverseMap();
            CreateMap<CardAttribute, CardAttributeDisplayDto>()
                .ForMember(dest => dest.AttributeName, src => src.MapFrom(x => x.Attribute.Name));
        }
    }
}
