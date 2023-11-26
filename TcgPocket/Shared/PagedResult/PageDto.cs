namespace TcgPocket.Shared.PagedResult;

public class PageDto
{
    public int? CurrentPage { get; set; }
    public int? PageSize { get; set; }
    public string? SortBy { get; set; }
    public string? OrderBy { get; set; }
}
