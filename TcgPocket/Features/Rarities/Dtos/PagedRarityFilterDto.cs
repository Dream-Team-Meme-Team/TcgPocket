using TcgPocket.Shared.PagedResult;

namespace TcgPocket.Features.Rarities.Dtos
{
    public class PagedRarityFilterDto : PageDto
    {
        public int? Id { get; set; }
        public int? GameId { get; set; }
        public string? Name { get; set; }
    }
}
