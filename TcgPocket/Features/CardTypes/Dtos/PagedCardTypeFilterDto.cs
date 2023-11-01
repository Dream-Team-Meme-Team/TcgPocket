using TcgPocket.Shared.PagedResult;

namespace TcgPocket.Features.CardTypes.Dtos
{
    public class PagedCardTypeFilterDto : PageDto
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public int? GameId { get; set; }
    }
}
