using TcgPocket.Shared.Interfaces;

namespace TcgPocket.Features.Decks;

public class Deck : DeckGetDto, IEntity
{
    public Users.User User { get; set; }
}

public class DeckGetDto : DeckDto
{
    public int Id { get; set; }
}

public class DeckDto
{
    public int UserId { get; set; }
    public string Name { get; set; }
}