using TcgPocket.Shared.PagedResult;

namespace TcgPocket.Features.Sets.Dtos
{
    public class PagedSetFilterDto : PageDto
    {
        public int? Id { get; set; }
        public int? GameId { get; set; }
        public string? Name { get; set; }
    }
}
