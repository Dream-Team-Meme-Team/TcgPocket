using TcgPocket.Features.Cards;
using TcgPocket.Features.Decks;
using TcgPocket.Shared.Interfaces;

namespace TcgPocket.Features.DeckCards
{
    public class DeckCard : DeckCardGetDto, IEntity
    {
        public Deck Deck { get; set; }
        public Card Card { get; set; }
    }

    public class DeckCardGetDto : DeckCardDto
    {
        public int Id { get; set; }
    }

    public class DeckCardDto
    {
        public int DeckId { get; set; }
        public int CardId { get; set; }
    }
}
