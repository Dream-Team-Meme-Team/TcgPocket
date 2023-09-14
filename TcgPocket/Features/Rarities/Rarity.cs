using TcgPocket.Features.Cards;
using TcgPocket.Features.Games;
using TcgPocket.Shared.Interfaces;

namespace TcgPocket.Features.Rarities
{
    public class Rarity : RarityGetDto, IEntity
    {
        public Game? Game { get; set; }
        public List<Card> Cards { get; set; }
    }

    public class RarityGetDto : RarityDto
    {
        public int Id { get; set; }
    }

    public class RarityDto
    {
        public string Name { get; set; }
        public int GameId { get; set; }
    }
}
