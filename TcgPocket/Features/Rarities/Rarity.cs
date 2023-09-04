using TcgPocket.Features.Games;
using TcgPocket.Shared.Interfaces;

namespace TcgPocket.Features.Rarities
{
    public class Rarity : IEntity
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int GameId { get; set; }

        public Game? Game { get; set; }
    }
}
