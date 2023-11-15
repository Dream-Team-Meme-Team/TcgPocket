using TcgPocket.Data;
using TcgPocket.Shared.Options;

namespace TcgPocket.Features.Rarities.Queries;

public class GetRarityOptionsRequest : GetOptionsRequest<Rarity>
{
}

public class GetRarityOptionsRequestHandler: GetOptionsRequestHandler<GetRarityOptionsRequest, Rarity>
{
    public GetRarityOptionsRequestHandler(DataContext dataContext) : base(dataContext)
    {
    }
}