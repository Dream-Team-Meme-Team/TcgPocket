using TcgPocket.Features.Cards;
using TcgPocket.Features.Cards.Dtos;
using TcgPocket.Features.DeckCards;
using TcgPocket.Features.Games;
using TcgPocket.Features.Users;
using TcgPocket.Shared.Interfaces;

namespace TcgPocket.Features.Decks;

public class Deck : DeckGetDto, IEntity
{
    public User User { get; set; }
    public Game Game { get; set; }
    public List<DeckCard> DeckCards { get; set; }
}

public class DeckGetDto : DeckDto
{
    public int Id { get; set; }
}

public class DeckDto
{
    public int UserId { get; set; }
    public GameGetDto Game { get; set; }
    public string Name { get; set; }
}

public class CreateDeckDto
{
    public int GameId { get; set; }
    public string Name { get; set; }
}

public class UpdateDeckDto : CreateDeckDto
{
    public List<MiniCardDto>? Cards { get; set; } = new();
}

public class DeckDetailDto : DeckGetDto
{
    public List<CardGetDto>? Cards { get; set; } = new(); 
}

public class DeckDisplayDto : DeckGetDto
{
    public List<DeckCardDisplayDto>? Cards { get; set; } = new();
}