using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared.PagedResult;

namespace TcgPocket.Shared.Filter;

public class FilterRequest<TEntity, TDto, TFilter> : IRequest<Response<List<TDto>>>
where TEntity: class
where TDto: class
where TFilter : class
{
    public TFilter Filter { get; set; }
}

public class FilterRequestHandler<TRequest, TEntity, TDto, TFilter> : IRequestHandler<TRequest, Response<List<TDto>>>
where TRequest : FilterRequest<TEntity, TDto, TFilter>
where TEntity : class
where TDto : class
where TFilter : class
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public FilterRequestHandler(DataContext dataContext,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
    }
    
    public async Task<Response<List<TDto>>> Handle(TRequest request, CancellationToken cancellationToken)
    {
        var entities = await _dataContext.Set<TEntity>()
            .FilterBy(request.Filter)
            .ToListAsync(cancellationToken);

        return _mapper.Map<List<TDto>>(entities).AsResponse();
    }
}