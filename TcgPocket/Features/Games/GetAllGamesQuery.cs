using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TcgPocket.Common;
using TcgPocket.Data;

namespace TcgPocket.Features.Games;

public class GetAllGamesQuery : IRequest<Response<List<GameDto>>>
{
    public int Page { get; set; }
    public int PageSize { get; set; }
}

public class GetAllGamesHandler : IRequestHandler<GetAllGamesQuery, Response<List<GameDto>>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public GetAllGamesHandler(DataContext dataContext,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
    }
    
    public async Task<Response<List<GameDto>>> Handle(GetAllGamesQuery request, CancellationToken cancellationToken)
    {
        var games = await _dataContext.Set<Game>()
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToListAsync(cancellationToken: cancellationToken);

        if (games.IsNullOrEmpty()) return Error.AsResponse<List<GameDto>>("Card Types not found");

        return _mapper.Map<List<GameDto>>(games).AsResponse();
    }
}