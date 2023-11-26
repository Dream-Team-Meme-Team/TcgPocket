using TcgPocket.Features.Cards;
using TcgPocket.Features.Games;
using TcgPocket.Shared.Interfaces;

namespace TcgPocket.Features.CardTypes;

public class CardType : CardTypeGetDto, IEntity
{
    public Game Game { get; set; }
    public List<Card> Cards { get; set; }
}

public class CardTypeGetDto : CardTypeDto
{
    public int Id { get; set; }
}

public class CardTypeDto
{
    public int GameId { get; set; }
    public string Name { get; set; }
}

