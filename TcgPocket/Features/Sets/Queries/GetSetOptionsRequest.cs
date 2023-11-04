using TcgPocket.Data;
using TcgPocket.Shared.Options;

namespace TcgPocket.Features.Sets.Queries;

public class GetSetOptionsRequest : GetOptionsRequest<Set>
{
}

public class GetSetOptionsRequestHandler: GetOptionsRequestHandler<GetSetOptionsRequest, Set>
{
    public GetSetOptionsRequestHandler(DataContext dataContext) : base(dataContext)
    {
    }
}