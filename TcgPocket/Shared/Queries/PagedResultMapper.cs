using AutoMapper;
using TcgPocket.Features.Cards;
using static TcgPocket.Shared.Queries.PagedResultClass;

namespace TcgPocket.Features.Games;

public class PagedResultMapper : Profile
{
    public PagedResultMapper()
    {
        CreateMap<PagedResult<Card>, PagedResult<CardGetDto>>();
    }
}
