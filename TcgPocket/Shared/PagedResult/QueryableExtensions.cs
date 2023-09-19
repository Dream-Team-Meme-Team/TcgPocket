using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Shared.Dtos;

namespace TcgPocket.Shared.PagedResult;

public static class QueryableExtensions
{
    public static IMapper Mapper;

    public static PagedResult<TEntity> GetPaged<TEntity>(this IQueryable<TEntity> query, int page, int pageSize)
    {
        var result = new PagedResult<TEntity>
        {
            CurrentPage = page,
            PageSize = pageSize,
            ItemCount = query.Count()
        };

        var pageCount = (double) result.ItemCount / pageSize;
        result.PageCount = (int) Math.Ceiling(pageCount);

        var skip = (page - 1) * pageSize;

        result.Items = query.Skip(skip)
            .Take(pageSize)
            .ToList();

        return result;
    }

    public static async Task<PagedResult<TEntity>> GetPagedAsync<TEntity>(this IQueryable<TEntity> query, int page, int pageSize, CancellationToken cancellationToken)
    {
        var result = new PagedResult<TEntity>
        {
            CurrentPage = page,
            PageSize = pageSize,
            ItemCount = await query.CountAsync(cancellationToken)
        };

        var pageCount = (double) result.ItemCount / pageSize;
        result.PageCount = (int) Math.Ceiling(pageCount);

        var skip = (page - 1) * pageSize;

        result.Items = await query.Skip(skip)
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        return result;
    }

    public static PagedResult<TDto> GetPaged<TEntity, TDto>(this IQueryable<TEntity> query, int page, int pageSize) where TDto : class
    {
        var result = new PagedResult<TDto>
        {
            CurrentPage = page,
            PageSize = pageSize,
            ItemCount = query.Count(),
        };

        var pageCount = (double) result.ItemCount / pageSize;
        result.PageCount = (int) Math.Ceiling(pageCount);

        var skip = (page - 1) * pageSize;
        
        result.Items = query.Skip(skip)
            .Take(pageSize)
            .ProjectTo<TDto>(Mapper.ConfigurationProvider)
            .ToList();

        return result;
    }

    public static async Task<PagedResult<TDto>> GetPagedAsync<TEntity, TDto>(this IQueryable<TEntity> query, int page, int pageSize, CancellationToken cancellationToken) where TDto : class
    {
        var result = new PagedResult<TDto>
        { 
            CurrentPage = page,
            PageSize = pageSize,
            ItemCount = await query.CountAsync(cancellationToken),

        };

        var pageCount = (double) result.ItemCount / pageSize;
        result.PageCount = (int) Math.Ceiling(pageCount);

        var skip = (page - 1) * pageSize;

        result.Items = await query.Skip(skip)
            .Take(pageSize)
            .ProjectTo<TDto>(Mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

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