using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Sets.Queries;

public class GetAllSetsQuery : IRequest<Response<List<SetGetDto>>>
{
}
public class GetAllSetsQueryHandler : IRequestHandler<GetAllSetsQuery, Response<List<SetGetDto>>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public GetAllSetsQueryHandler(DataContext dataContext,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
    }

    public async Task<Response<List<SetGetDto>>> Handle(GetAllSetsQuery query, CancellationToken cancellationToken)
    {
        var set = await _dataContext.Set<Set>()
            .ToListAsync(cancellationToken: cancellationToken);

        return _mapper.Map<List<SetGetDto>>(set).AsResponse();
    }
}