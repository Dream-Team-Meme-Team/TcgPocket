using AutoMapper;

namespace TcgPocket.Features.Cards
{
    public class CardMapper : Profile
    {
        public CardMapper() 
        {
            CreateMap<Card, CardGetDto>();

            CreateMap<CardDto, Card>()
                .ForMember(x => x.Id, y => y.Ignore());
        }
    }
}
