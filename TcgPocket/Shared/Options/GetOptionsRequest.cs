using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using AutoMapper;
using TcgPocket.Data;
using TcgPocket.Shared.Interfaces;

namespace TcgPocket.Shared.Options;

public class GetOptionsRequest<TEntity> : IRequest<Response<List<OptionItemDto>>>
    where TEntity : class, IEntity
{
    public Expression<Func<TEntity, OptionItemDto>> MappingExpression { get; set; }
    public Expression<Func<TEntity, bool>> FilterExpression { get; set; }
}

public class GetOptionsRequestHandler<TRequest, TEntity> : IRequestHandler<TRequest, Response<List<OptionItemDto>>>
    where TRequest : GetOptionsRequest<TEntity>
    where TEntity : class, IEntity
{
    private readonly DataContext _dataContext;

    public GetOptionsRequestHandler(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<Response<List<OptionItemDto>>> Handle(TRequest request, CancellationToken _)
    {
        var query = GetEntities();

        if (request.FilterExpression is not null)
        {
            query = FilterEntities(query, request);
        }

        if (request.MappingExpression is null)
        {
            return Error.AsResponse<List<OptionItemDto>>("Mapping Expression not provided");
        }
        
        var optionsQuery = MapEntities(query, request);
        var options = await GetOptions(optionsQuery);

        return options.AsResponse();
    }

    protected virtual IQueryable<TEntity> GetEntities()
    {
        return _dataContext.Set<TEntity>();
    }

    protected virtual IQueryable<TEntity> FilterEntities(IQueryable<TEntity> query, TRequest request)
    {
        return query.Where(request.FilterExpression);
    }

    protected virtual IQueryable<OptionItemDto> MapEntities(IQueryable<TEntity> query, TRequest request)
    {
        return query.Select(request.MappingExpression);
    }

    protected virtual async Task<List<OptionItemDto>> GetOptions(IQueryable<OptionItemDto> query)
    {
        return await query.ToListAsync();
    }
}


public class GetOptionsRequest<TEntity, TDto> : IRequest<Response<List<OptionItemDto<TDto>>>>
    where TEntity : class, IEntity
    where TDto : class
{
    public Expression<Func<TEntity, OptionItemDto<TDto>>> MappingExpression { get; set; }
    public Expression<Func<TEntity, bool>> FilterExpression { get; set; }
}

public class GetOptionsRequestHandler<TRequest, TEntity, TDto> : IRequestHandler<TRequest, Response<List<OptionItemDto<TDto>>>>
    where TRequest : GetOptionsRequest<TEntity, TDto>
    where TEntity : class, IEntity
    where TDto : class
{
    private readonly DataContext _dataContext;
    public readonly IMapper Mapper;

    public GetOptionsRequestHandler(DataContext dataContext, IMapper mapper)
    {
        _dataContext = dataContext;
        Mapper = mapper;
    }

    public async Task<Response<List<OptionItemDto<TDto>>>> Handle(TRequest request, CancellationToken _)
    {
        var query = GetEntities();
        
        if (request.FilterExpression is not null)
        {
            query = FilterEntities(query, request);
        }

        if (request.MappingExpression is null)
        {
            return Error.AsResponse<List<OptionItemDto<TDto>>>("Mapping Expression not provided");
        }
        
        var optionsQuery = MapEntities(query, request);
        var options = await GetOptions(optionsQuery);

        await BeforeReturn(options);

        return options.AsResponse();
    }

    protected virtual IQueryable<TEntity> GetEntities()
    {
        return _dataContext.Set<TEntity>();
    }

    protected virtual IQueryable<TEntity> FilterEntities(IQueryable<TEntity> query, TRequest request)
    {
        return query.Where(request.FilterExpression);
    }

    protected virtual IQueryable<OptionItemDto<TDto>> MapEntities(IQueryable<TEntity> query, TRequest request)
    {
        return query.Select(request.MappingExpression);
    }

    protected virtual async Task<List<OptionItemDto<TDto>>> GetOptions(IQueryable<OptionItemDto<TDto>> query)
    {
        return await query.ToListAsync();
    }

    protected virtual Task BeforeReturn(List<OptionItemDto<TDto>> options)
    {
        return Task.CompletedTask;
    }

}
