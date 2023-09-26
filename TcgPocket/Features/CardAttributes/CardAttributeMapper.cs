using AutoMapper;

namespace TcgPocket.Features.CardAttributes
{
    public class CardAttributeMapper : Profile
    {
        public CardAttributeMapper() 
        {
            CreateMap<CardAttributeDto, CardAttribute>().ReverseMap();
        }
    }
}
