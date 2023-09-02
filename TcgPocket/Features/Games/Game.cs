using TcgPocket.Features.CardTypes;
using TcgPocket.Shared.Interfaces;

namespace TcgPocket.Features.Games;

public class Game : GameGetDto, IEntity
{
    public List<CardType> CardTypes { get; set; }
}

public class GameGetDto : GameDto
{
    public int Id { get; set; }
}

public class GameDto
{
    public string Name { get; set; }
}