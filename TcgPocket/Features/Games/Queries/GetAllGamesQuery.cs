using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Games.Queries;

public class GetAllGamesQuery : IRequest<Response<List<GameGetDto>>>
{
}

public class GetAllGamesQueryHandler : IRequestHandler<GetAllGamesQuery, Response<List<GameGetDto>>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public GetAllGamesQueryHandler(DataContext dataContext,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
    }
    
    public async Task<Response<List<GameGetDto>>> Handle(GetAllGamesQuery query, CancellationToken cancellationToken)
    {
        var games = await _dataContext.Set<Game>()
            .ToListAsync(cancellationToken: cancellationToken);

        if (games.IsNullOrEmpty()) return Error.AsResponse<List<GameGetDto>>("Games not found");

        return _mapper.Map<List<GameGetDto>>(games).AsResponse();
    }
}