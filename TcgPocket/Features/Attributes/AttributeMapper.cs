using AutoMapper;

namespace TcgPocket.Features.Attributes;

public class AttributeMapper : Profile
{
	public AttributeMapper()
	{
		CreateMap<Attribute, AttributeGetDto>();
		CreateMap<Attribute, AttributeDto>().ReverseMap();
	}
}
