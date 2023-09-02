using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Games.Queries;

public class GetGameByIdRequest : IRequest<Response<GameDto>>
{
    public int Id { get; set; }
}

public class GetGameByIdRequestHandler : IRequestHandler<GetGameByIdRequest, Response<GameDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public GetGameByIdRequestHandler(DataContext dataContext,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
    }
    
    public async Task<Response<GameDto>> Handle(GetGameByIdRequest request, CancellationToken cancellationToken)
    {
        var game = await _dataContext.Set<Game>()
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (game is null) return Error.AsResponse<GameDto>("Game not found", "id");

        return _mapper.Map<GameDto>(game).AsResponse();
    }
}