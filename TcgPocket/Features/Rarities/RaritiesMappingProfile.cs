using AutoMapper;

namespace TcgPocket.Features.Rarities
{
    public class RaritiesMappingProfile : Profile
    {
        public RaritiesMappingProfile() 
        {
            CreateMap<Rarity, RarityGetDto>();

            CreateMap<RarityDto, Rarity>()
                .ForMember(x => x.Id, y => y.Ignore());
        }
    }
}
