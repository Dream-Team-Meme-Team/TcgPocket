using TcgPocket.Features.CardTypes;
using Attribute = TcgPocket.Features.Attributes.Attribute;
using TcgPocket.Features.Sets;
using TcgPocket.Shared.Interfaces;
using TcgPocket.Features.Rarities;
using TcgPocket.Features.Cards;

namespace TcgPocket.Features.Games;

public class Game : GameGetDto, IEntity
{
    public List<CardType> CardTypes { get; set; }
    public List<Attribute> Attributes { get; set; }
    public List<Set> Sets { get; set; }
    public List<Rarity> Rarities { get; set; }
    public List<Card> Cards { get; set; }
}

public class GameGetDto : GameDto
{
    public int Id { get; set; }
}

public class GameDto
{
    public string Name { get; set; }
}