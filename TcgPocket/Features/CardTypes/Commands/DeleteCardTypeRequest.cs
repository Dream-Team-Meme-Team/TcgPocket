using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.CardTypes.Commands;

public class DeleteCardTypeRequest : IRequest<Response>
{
    public int Id { get; set; }
}

public class DeleteCardTypeRequestHandler : IRequestHandler<DeleteCardTypeRequest, Response>
{
    private readonly DataContext _dataContext;

    public DeleteCardTypeRequestHandler(DataContext dataContext)
    {
        _dataContext = dataContext;
    }
    public async Task<Response> Handle(DeleteCardTypeRequest request, CancellationToken cancellationToken)
    {
        var cardType = await _dataContext.Set<CardType>()
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        
        if (cardType is null) return Error.AsResponse("Card Type not found", "id");

        _dataContext.Set<CardType>().Remove(cardType);
        await _dataContext.SaveChangesAsync(cancellationToken);
        
        return Response.Success;
    }
}