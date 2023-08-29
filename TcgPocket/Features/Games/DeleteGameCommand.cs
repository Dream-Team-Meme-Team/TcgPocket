using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Common;
using TcgPocket.Data;

namespace TcgPocket.Features.Games;

public class DeleteGameCommand : IRequest<Response>
{
    public int Id { get; set; }
}

public class DeleteGameHandler : IRequestHandler<DeleteGameCommand, Response>
{
    private readonly DataContext _dataContext;

    public DeleteGameHandler(DataContext dataContext)
    {
        _dataContext = dataContext;
    }
    public async Task<Response> Handle(DeleteGameCommand request, CancellationToken cancellationToken)
    {
        var game = await _dataContext.Set<Game>()
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        
        if (game is null) return Error.AsResponse("Game not found", "id");

        _dataContext.Set<Game>().Remove(game);
        await _dataContext.SaveChangesAsync(cancellationToken);
        
        return Response.Success;
    }
}