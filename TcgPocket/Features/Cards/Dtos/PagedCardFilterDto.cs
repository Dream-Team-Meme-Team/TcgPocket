using TcgPocket.Shared.PagedResult;

namespace TcgPocket.Features.Cards.Dtos;

public class PagedCardFilterDto : PageDto
{
    public string? Name { get; set; }
    public string? CardNumber { get; set; }
    public int? GameId { get; set; }
    public int? CardTypeId { get; set; }
    public int? RarityId { get; set; }
    public int? SetId { get; set; }
    public string? ImageUrl { get; set; }
    public string? Description { get; set; }
}