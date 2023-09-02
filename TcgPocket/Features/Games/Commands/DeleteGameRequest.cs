using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Games.Commands;

public class DeleteGameRequest : IRequest<Response>
{
    public int Id { get; set; }
}

public class DeleteGameRequestHandler : IRequestHandler<DeleteGameRequest, Response>
{
    private readonly DataContext _dataContext;

    public DeleteGameRequestHandler(DataContext dataContext)
    {
        _dataContext = dataContext;
    }
    public async Task<Response> Handle(DeleteGameRequest request, CancellationToken cancellationToken)
    {
        var game = await _dataContext.Set<Game>()
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        
        if (game is null) return Error.AsResponse("Game not found", "id");

        _dataContext.Set<Game>().Remove(game);
        await _dataContext.SaveChangesAsync(cancellationToken);
        
        return Response.Success;
    }
}