using TcgPocket.Shared.PagedResult;

namespace TcgPocket.Features.Cards.Dtos;

public class PagedCardFilterDto : PageDto
{
    public string? Name { get; set; }
    public string? CardNumber { get; set; }
    public List<int> GameIds { get; set; } = new();
    public List<int> CardTypeIds { get; set; } = new();
    public List<int> RarityIds { get; set; } = new();
    public List<int> SetIds { get; set; } = new();
    public string? ImageUrl { get; set; }
    public string? Description { get; set; }
}