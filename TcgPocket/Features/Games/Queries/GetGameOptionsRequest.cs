using TcgPocket.Data;
using TcgPocket.Shared.Options;

namespace TcgPocket.Features.Games.Queries;

public class GetGameOptionsRequest : GetOptionsRequest<Game>
{
}

public class GetGameOptionsRequestHandler: GetOptionsRequestHandler<GetGameOptionsRequest, Game>
{
    public GetGameOptionsRequestHandler(DataContext dataContext) : base(dataContext)
    {
    }
}