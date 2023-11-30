using AutoMapper;
using Newtonsoft.Json;
using TcgPocket.Shared;

namespace TcgPocket.Features.CardReader.Dtos;

public class YugiohResponse
{
    public List<YugiohData> Data { get; set; }
}

public class YugiohData
{
    public string Name { get; set; }
    [JsonProperty("set_name")]
    public string SetName { get; set; }
    [JsonProperty("set_code")]
    public string SetCode { get; set; } 
}

public class YugiohCardSet
{
    public string SetRarity { get; set; }
    public string SetCode { get; set; }
}

public class YugiohCardImage
{
    public string ImageUrl { get; set; }
}

public class YugiohDataMapper : Profile
{
    public YugiohDataMapper()
    {
        CreateMap<YugiohData, ExternalCardFilterDto>()
            .ForMember(dest => dest.GameName, opts => opts.MapFrom(x => GameNames.Yugioh))
            .ForMember(dest => dest.SetName, opts => opts.MapFrom(src => src.SetName))
            .ForMember(dest => dest.CardNumber, opts => opts.MapFrom(src => src.SetCode));
    }
}