using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Common;
using TcgPocket.Data;

namespace TcgPocket.Features.Games;

public class GetGameByIdQuery : IRequest<Response<GameDto>>
{
    public int Id { get; set; }
}

public class GetGameByIdHandler : IRequestHandler<GetGameByIdQuery, Response<GameDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public GetGameByIdHandler(DataContext dataContext,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
    }
    
    public async Task<Response<GameDto>> Handle(GetGameByIdQuery request, CancellationToken cancellationToken)
    {
        var game = await _dataContext.Set<Game>()
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (game is null) return Error.AsResponse<GameDto>("Game not found", "id");

        return _mapper.Map<GameDto>(game).AsResponse();
    }
}