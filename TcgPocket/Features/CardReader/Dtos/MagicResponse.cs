using System.Text.RegularExpressions;
using AutoMapper;
using Newtonsoft.Json;
using TcgPocket.Shared;

namespace TcgPocket.Features.CardReader.Dtos;

public class MagicResponse
{
    public List<MagicData> Data { get; set; }
}

public class MagicData
{
    public string Name { get; set; }
    public string Rarity { get; set; }
    [JsonProperty("type_line")]
    public string TypeLine { get; set; }
    [JsonProperty("set_name")]
    public string SetName { get; set; }
    [JsonProperty("collector_number")]
    public string CollectorNumber { get; set; }
    [JsonProperty("image_uris")]
    public MagicImageUris ImageUris { get; set; }
    [JsonProperty("oracle_text")]
    public string OracleText { get; set; }
}

public class MagicImageUris
{
    public string Large { get; set; }
}

public class MagicDataMapper : Profile
{
    public MagicDataMapper()
    {
        CreateMap<MagicData, ExternalCardFilterDto>()
            .ForMember(dest => dest.GameName, opts => opts.MapFrom(x => GameNames.Magic))
            .ForMember(dest => dest.SetName, opts => opts.MapFrom(src => src.SetName))
            .ForMember(dest => dest.CardNumber, opts => opts.MapFrom(src => src.CollectorNumber));
    }
}