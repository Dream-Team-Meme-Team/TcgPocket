using TcgPocket.Data;
using TcgPocket.Shared.Options;

namespace TcgPocket.Features.CardTypes.Queries;

public class GetCardTypeOptionsRequest : GetOptionsRequest<CardType>
{
}

public class GetCardTypeOptionsRequestHandler: GetOptionsRequestHandler<GetCardTypeOptionsRequest, CardType>
{
    public GetCardTypeOptionsRequestHandler(DataContext dataContext) : base(dataContext)
    {
    }
}