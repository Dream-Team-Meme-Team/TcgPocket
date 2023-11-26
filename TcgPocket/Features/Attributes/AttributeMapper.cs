using AutoMapper;
using TcgPocket.Features.CardAttributes;

namespace TcgPocket.Features.Attributes;

public class AttributeMapper : Profile
{
	public AttributeMapper()
	{
		CreateMap<Attribute, AttributeGetDto>();
		CreateMap<Attribute, AttributeDto>().ReverseMap();

		CreateMap<Attribute, CardAttributeDto>();
	}
}
