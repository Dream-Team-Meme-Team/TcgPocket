namespace TcgPocket.Features.CardReader.Dtos;

public class PokemonResponse
{
    public List<PokemonData> Data { get; set; }
}

public class PokemonData
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Supertype { get; set; }
    public List<string> Subtypes { get; set; }
    public string Hp { get; set; }
    public List<string> Types { get; set; }
    public string EvolvesFrom { get; set; }

}