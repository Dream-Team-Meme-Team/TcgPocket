using TcgPocket.Features.CardTypes;
using TcgPocket.Features.Games;
using TcgPocket.Features.Rarities;
using TcgPocket.Features.Sets;
using TcgPocket.Shared.Interfaces;

namespace TcgPocket.Features.Cards
{
    public class Card : CardGetDto, IEntity
    {
        public Game Game { get; set; }
        public CardType CardType { get; set; }
        public Rarity Rarity { get; set; }
        public Set Set { get; set; }
    }

    public class CardGetDto : CardDto
    {
        public int Id { get; set; }
    }

    public class CardDto
    {
        public string Name { get; set; }
        public string CardNumber { get; set; }
        public int GameId { get; set; }
        public int CardTypeId { get; set; }
        public int RarityId { get; set; }
        public int SetId { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
    }
}
