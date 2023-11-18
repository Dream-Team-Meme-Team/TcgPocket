using AutoMapper;
using TcgPocket.Shared;

namespace TcgPocket.Features.CardReader.Dtos;

public class PokemonResponse
{
    public List<PokemonData> Data { get; set; }
}

public class PokemonData
{
    public string Name { get; set; }
    public PokemonSet Set { get; set; }
    public int Number { get; set; }
    public string Supertype { get; set; }
    public List<string> Subtypes { get; set; }
    public List<string> Types { get; set; }
    public string Rarity { get; set; }
    public PokemonImage Images { get; set; }
}

public class PokemonImage
{
    public string Large { get; set; }
}

public class PokemonSet
{
    public string Name { get; set; }
}

public class PokemonDataMapper : Profile
{
    public PokemonDataMapper()
    {
        CreateMap<PokemonData, ExternalCardFilterDto>()
            .ForMember(dest => dest.GameName, opts => opts.MapFrom(x => GameNames.Pokemon))
            .ForMember(dest => dest.SetName, opts => opts.MapFrom(src => src.Set.Name))
            .ForMember(dest => dest.CardNumber, opts => opts.MapFrom(src => src.Number));
    }
}