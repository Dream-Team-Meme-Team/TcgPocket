namespace TcgPocket.Shared.Queries;

public class GetAllQuery
{
    public int Page { get; set; }
    public int PageSize { get; set; } = 25;
    public int PageCount { get; set; }
}

public class GetAllQueryPage<T>
{
    public int Page { get; set; }

    public int PageSize { get; set; }

    public int PageCount { get; set; }

    public int TotalItemCount { get; set; }

    public List<T> Items { get; set; }
}
