using TcgPocket.Shared.PagedResult;

namespace TcgPocket.Features.Attributes.Dtos
{
    public class PagedAttributeFilterDto : PageDto
    {
        public int? Id { get; set; }
        public int? GameId { get; set; }
        public string? Name { get; set; }
    }
}