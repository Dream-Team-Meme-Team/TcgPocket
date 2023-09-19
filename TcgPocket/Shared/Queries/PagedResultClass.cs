using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Shared.Dtos;
using TcgPocket.Shared.Interfaces;

namespace TcgPocket.Shared.Queries;

public static class PagedResultClass
{
    public static IMapper mapper;
    public static PagedResult<T> GetPaged<T>(this IQueryable<T> query, int page, int pageSize)
    {
        var result = new PagedResult<T>
        {
            CurrentPage = page,
            PageSize = pageSize,
            ItemCount = query.Count()
        };

        var pageCount = (double)result.ItemCount / pageSize;
        result.PageCount = (int)Math.Ceiling(pageCount);

        var skip = (page - 1) * pageSize;
        result.Items = query.Skip(skip).Take(pageSize).ToList();

        return result;
    }

    public static async Task<PagedResult<T>> GetPagedAsync<T>(this IQueryable<T> query, int page, int pageSize)
    {
        var result = new PagedResult<T>
        {
            CurrentPage = page,
            PageSize = pageSize,
            ItemCount = await query.CountAsync()
        };

        var pageCount = (double)result.ItemCount / pageSize;
        result.PageCount = (int)Math.Ceiling(pageCount);

        var skip = (page - 1) * pageSize;
        result.Items = await query.Skip(skip).Take(pageSize).ToListAsync();

        return result;
    }

    public static PagedResult<U> GetPaged<T, U>(this IQueryable<T> query, int page, int pageSize) where U : class
    {
        var result = new PagedResult<U>();
        result.CurrentPage = page;
        result.PageSize = pageSize;
        result.ItemCount = query.Count();

        var pageCount = (double)result.ItemCount / pageSize;
        result.PageCount = (int)Math.Ceiling(pageCount);

        var skip = (page - 1) * pageSize;
        result.Items = query.Skip(skip)
                              .Take(pageSize)
                              .ProjectTo<U>(mapper.ConfigurationProvider)
                              .ToList();
        return result;
    }

    public static async Task<PagedResult<U>> GetPagedAsync<T, U>(this IQueryable<T> query, int page, int pageSize) where U : class
    {
        var result = new PagedResult<U>();
        result.CurrentPage = page;
        result.PageSize = pageSize;
        result.ItemCount = await query.CountAsync();

        var pageCount = (double)result.ItemCount / pageSize;
        result.PageCount = (int)Math.Ceiling(pageCount);

        var skip = (page - 1) * pageSize;
        result.Items = await query.Skip(skip)
                                    .Take(pageSize)
                                    .ProjectTo<U>(mapper.ConfigurationProvider)
                                    .ToListAsync();

        return result;
    }

    public class PagedResult<T> : PagedResultBase
    {
        public IList<T> Items { get; set; }
        public PagedResult()
        {
            Items = new List<T>();
        }
    }
}

public abstract class PagedResultBase : PageDto
{
    public int PageCount { get; set; }
    public int ItemCount { get; set; }
    public int FirstRowOnPage
    {
        get { return (CurrentPage - 1) * PageSize + 1; }
    }
    public int LastRowOnPage
    {
        get { return Math.Min(CurrentPage * PageSize, ItemCount); }
    }
}