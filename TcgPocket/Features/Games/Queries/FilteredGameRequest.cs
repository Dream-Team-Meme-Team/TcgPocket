using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared;
using TcgPocket.Shared.PagedResult;

namespace TcgPocket.Features.Games.Queries;

public class GameFilterDto
{
    public int? Id { get; set; }
    public string? Name { get; set; }
}

public class FilteredGameRequest : IRequest<Response<List<GameGetDto>>>
{
    public GameFilterDto Filter { get; set; }
}

public class FilteredGameRequestHandler : IRequestHandler<FilteredGameRequest, Response<List<GameGetDto>>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public FilteredGameRequestHandler(DataContext dataContext,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
    }
    
    public async Task<Response<List<GameGetDto>>> Handle(FilteredGameRequest request, CancellationToken cancellationToken)
    {
        var entities = await _dataContext.Set<Game>()
            .FilterBy(request.Filter)
            .ToListAsync(cancellationToken);

        return _mapper.Map<List<GameGetDto>>(entities).AsResponse();
    }
}