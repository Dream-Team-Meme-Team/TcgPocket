using AutoMapper;
using System.Net.NetworkInformation;
using TcgPocket.Features.Rarities.Dtos.Requests;
using TcgPocket.Features.Rarities.Dtos.Responses;

namespace TcgPocket.Features.Rarities
{
    public class RaritiesMappingProfile : Profile
    {
        public RaritiesMappingProfile() 
        {
            CreateMap<Rarity, RarityResponseDto>();

            CreateMap<CreateRarityDto, Rarity>()
                .ForMember(x => x.Id, y => y.Ignore());

            CreateMap<UpdateRarityDto, Rarity>()
                .ForMember(x => x.Id, y => y.Ignore());
        }
    }
}
