using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Common;
using TcgPocket.Data;

namespace TcgPocket.Features.CardTypes;

public class DeleteCardTypeCommand : IRequest<Response>
{
    public int Id { get; set; }
}

public class DeleteCardTypeHandler : IRequestHandler<DeleteCardTypeCommand, Response>
{
    private readonly DataContext _dataContext;

    public DeleteCardTypeHandler(DataContext dataContext)
    {
        _dataContext = dataContext;
    }
    public async Task<Response> Handle(DeleteCardTypeCommand request, CancellationToken cancellationToken)
    {
        var cardType = await _dataContext.Set<CardType>()
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        
        if (cardType is null) return Error.AsResponse("Card Type not found", "id");

        _dataContext.Set<CardType>().Remove(cardType);
        await _dataContext.SaveChangesAsync(cancellationToken);
        
        return Response.Success;
    }
}