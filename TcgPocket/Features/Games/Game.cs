using TcgPocket.Features.CardTypes;
using TcgPocket.Features.Attributes;
using TcgPocket.Features.Sets;
using TcgPocket.Shared.Interfaces;

namespace TcgPocket.Features.Games;

public class Game : GameGetDto, IEntity
{
    public List<CardType> CardTypes { get; set; }
    public List<Attributes.Attribute> Attributes { get; set; }
    public List<Set> Sets { get; set; }
}

public class GameGetDto : GameDto
{
    public int Id { get; set; }
}

public class GameDto
{
    public string Name { get; set; }
}