using MediatR;
using Microsoft.OpenApi.Writers;
using TcgPocket.Shared;

namespace TcgPocket.Features.CardReader;

public class ReadCardRequest : IRequest<Response<object>>
{
    
}

public class ReadCardRequestHandler : IRequestHandler<ReadCardRequest, Response<object>>
{
    public Task<Response<object>> Handle(ReadCardRequest request, CancellationToken cancellationToken)
    {
        dynamic a = new { Id = 2 };
        
        return a;
    }
}
