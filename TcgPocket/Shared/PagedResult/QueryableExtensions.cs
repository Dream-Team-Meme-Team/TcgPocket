using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Shared.Dtos;
using TcgPocket.Shared.Interfaces;

namespace TcgPocket.Shared.PagedResult;

public static class QueryableExtensions
{
    public static IMapper Mapper;

    public static PagedResult<TEntity> GetPaged<TEntity>(this IQueryable<TEntity> query, int? page, int? pageSize)
        where TEntity : IEntity
    {
        if (page is null || pageSize is null)
        {
            return query.HandleNullPageDto();
        }

        var result = new PagedResult<TEntity>
        {
            CurrentPage = page,
            PageSize = pageSize,
            ItemCount = query.Count()
        };

        var pageCount = (double) result.ItemCount / pageSize.Value;
        result.PageCount = (int) Math.Ceiling(pageCount);

        var skip = (page.Value - 1) * pageSize.Value;

        result.Items = query.Skip(skip)
            .Take(pageSize.Value)
            .ToList();

        result.FirstRowOnPage = (result.CurrentPage.Value - 1) * result.PageSize.Value + 1;
        result.LastRowOnPage = Math.Min(result.CurrentPage.Value * result.PageSize.Value, result.ItemCount);

        return result;
    }

    public static async Task<PagedResult<TEntity>> GetPagedAsync<TEntity>(this IQueryable<TEntity> query, int? page, int? pageSize, CancellationToken cancellationToken)
        where TEntity : IEntity
    {
        if (page is null || pageSize is null)
        {
            return query.HandleNullPageDto();
        }

        var result = new PagedResult<TEntity>
        {
            CurrentPage = page,
            PageSize = pageSize,
            ItemCount = await query.CountAsync(cancellationToken)
        };

        var pageCount = (double) result.ItemCount / pageSize.Value;
        result.PageCount = (int) Math.Ceiling(pageCount);

        var skip = (page.Value - 1) * pageSize.Value;

        result.Items = await query.Skip(skip)
            .Take(pageSize.Value)
            .ToListAsync(cancellationToken);

        result.FirstRowOnPage = (result.CurrentPage.Value - 1) * result.PageSize.Value + 1;
        result.LastRowOnPage = Math.Min(result.CurrentPage.Value * result.PageSize.Value, result.ItemCount);

        return result;
    }

    public static PagedResult<TDto> GetPaged<TEntity, TDto>(this IQueryable<TEntity> query, int? page, int? pageSize)
        where TEntity : IEntity
    {
        if (page is null || pageSize is null)
        {
            return query.HandleNullPageDto<TEntity, TDto>();
        }

        var result = new PagedResult<TDto>
        {
            CurrentPage = page,
            PageSize = pageSize,
            ItemCount = query.Count(),
        };

        var pageCount = (double) result.ItemCount / pageSize.Value;
        result.PageCount = (int) Math.Ceiling(pageCount);

        var skip = (page.Value - 1) * pageSize.Value;
        
        result.Items = query.Skip(skip)
            .Take(pageSize.Value)
            .ProjectTo<TDto>(Mapper.ConfigurationProvider)
            .ToList();

        result.FirstRowOnPage = (result.CurrentPage.Value - 1) * result.PageSize.Value + 1;
        result.LastRowOnPage = Math.Min(result.CurrentPage.Value * result.PageSize.Value, result.ItemCount);

        return result;
    }

    public static async Task<PagedResult<TDto>> GetPagedAsync<TEntity, TDto>(this IQueryable<TEntity> query, int? page, int? pageSize, CancellationToken cancellationToken)
        where TEntity : IEntity
    {
        if (page is null || pageSize is null)
        {
            return query.HandleNullPageDto<TEntity, TDto>();
        }

        var result = new PagedResult<TDto>
        { 
            CurrentPage = page,
            PageSize = pageSize,
            ItemCount = await query.CountAsync(cancellationToken),

        };

        var pageCount = (double) result.ItemCount / pageSize.Value;
        result.PageCount = (int) Math.Ceiling(pageCount);

        var skip = (page.Value - 1) * pageSize.Value;

        result.Items = await query.Skip(skip)
            .Take(pageSize.Value)
            .ProjectTo<TDto>(Mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        result.FirstRowOnPage = (result.CurrentPage.Value - 1) * result.PageSize.Value + 1;
        result.LastRowOnPage = Math.Min(result.CurrentPage.Value * result.PageSize.Value, result.ItemCount);

        return result;
    }

    public static PagedResult<TDto> HandleNullPageDto<TEntity, TDto>(this IQueryable<TEntity> query)
        where TEntity : IEntity
    {
        var entity = query.ToList();

        var pagedEntity = new PagedResult<TDto>
        {
            CurrentPage = 1,
            ItemCount = entity.Count(),
            Items = Mapper.Map<List<TDto>>(entity),
            PageCount = 1,
            PageSize = null
        };

        return pagedEntity;
    }

    public static PagedResult<TEntity> HandleNullPageDto<TEntity>(this IQueryable<TEntity> query)
        where TEntity : IEntity
    {
        var entity = query.ToList();

        var pagedEntity = new PagedResult<TEntity>
        {
            CurrentPage = 1,
            ItemCount = entity.Count(),
            Items = entity,
            PageCount = 1,
            PageSize = null
        };

        return pagedEntity;
    }

}
public class PagedResult<T> : PagedResultBase
{
    public IList<T> Items { get; set; }

    public PagedResult()
    {
        Items = new List<T>();
    }
}

public abstract class PagedResultBase : PageDto
{
    public int PageCount { get; set; }
    public int ItemCount { get; set; }
    public int FirstRowOnPage { get; set; }
    public int LastRowOnPage { get; set; }
}