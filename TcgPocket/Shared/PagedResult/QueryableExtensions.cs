using System.Linq.Expressions;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Shared.Interfaces;

namespace TcgPocket.Shared.PagedResult;

public static class QueryableExtensions
{
    public static PagedResult<TDto> GetPaged<TEntity, TDto>(
        this IQueryable<TEntity> query, IMapper mapper, int? page = null, int? pageSize = null)
        where TEntity : IEntity
    {
        if (page is null || pageSize is null)
        {
            return query.HandleNullPageDto<TEntity, TDto>(mapper);
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
            .ProjectTo<TDto>(mapper.ConfigurationProvider)
            .ToList();

        result.FirstRowOnPage = (result.CurrentPage.Value - 1) * result.PageSize.Value + 1;
        result.LastRowOnPage = Math.Min(result.CurrentPage.Value * result.PageSize.Value, result.ItemCount);

        return result;
    }

    public static async Task<PagedResult<TDto>> GetPagedAsync<TEntity, TDto>(
        this IQueryable<TEntity> query, IMapper mapper, int? page = null, int? pageSize = null)
        where TEntity : IEntity
    {
        if (page is null || pageSize is null)
        {
            return query.HandleNullPageDto<TEntity, TDto>(mapper);
        }

        var result = new PagedResult<TDto>
        { 
            CurrentPage = page,
            PageSize = pageSize,
            ItemCount = await query.CountAsync(),

        };

        var pageCount = (double) result.ItemCount / pageSize.Value;
        result.PageCount = (int) Math.Ceiling(pageCount);

        var skip = (page.Value - 1) * pageSize.Value;

        result.Items = await query.Skip(skip)
            .Take(pageSize.Value)
            .ProjectTo<TDto>(mapper.ConfigurationProvider)
            .ToListAsync();

        result.FirstRowOnPage = (result.CurrentPage.Value - 1) * result.PageSize.Value + 1;
        result.LastRowOnPage = Math.Min(result.CurrentPage.Value * result.PageSize.Value, result.ItemCount);

        return result;
    }

    public static PagedResult<TDto> HandleNullPageDto<TEntity, TDto>(this IQueryable<TEntity> query, IMapper mapper)
        where TEntity : IEntity
    {
        var entity = query.ToList();

        var pagedEntity = new PagedResult<TDto>
        {
            CurrentPage = 1,
            ItemCount = entity.Count(),
            Items = mapper.Map<List<TDto>>(entity),
            PageCount = 1,
            PageSize = null
        };

        return pagedEntity;
    }

    public static PagedResult<TEntity> HandleNullPageDto<TEntity>(this IQueryable<TEntity> query, IMapper mapper)
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

    public static IQueryable<TEntity> FilterBy<TEntity, TFilter>(this IQueryable<TEntity> query, TFilter filter)
    where TEntity : class
    where TFilter : class
    {
        // get object fields
        var entityFields = typeof(TEntity).GetProperties();
        var filterFields = typeof(TFilter).GetProperties();

        // get common fields where filter value is not null 
        var commonFields = filterFields
            .Where(x => entityFields.Any(y => y.Name == x.Name))
            .Where(fields => fields.GetValue(filter, null) is not null)
            .ToList();

        // setup predicate and type expression
        var entityTypeExpression = Expression.Parameter(typeof(TEntity));
        Expression? expression = null;

        commonFields.ForEach(field =>
        {
            // get entity field and value
            var entityField = Expression.PropertyOrField(entityTypeExpression, field.Name);
            var entityFieldType = entityField.Type;

            // convert raw field value to desired type (probably not necessary but it makes me feel safe)
            var rawFiledValue = field.GetValue(filter);
            var convertedFieldValue = Convert.ChangeType(rawFiledValue, entityFieldType);
            
            Expression filterExpression = entityFieldType == typeof(string)
                ? Expression.Call(entityField, nameof(string.Contains), null, Expression.Constant(convertedFieldValue))
                : Expression.Equal(entityField, Expression.Constant(convertedFieldValue, entityFieldType));
            
            expression ??= filterExpression;
            expression = Expression.AndAlso(expression, filterExpression);
        });

        if (expression is null) return query;
        
        var lambda = Expression.Lambda<Func<TEntity, bool>>(expression, entityTypeExpression);
        query = query.Where(lambda);

        return query;
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