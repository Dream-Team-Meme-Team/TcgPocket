using AutoMapper;
using TcgPocket.Features.Cards;
using static TcgPocket.Shared.PagedResult.PagedResultClass;

namespace TcgPocket.Shared.PagedResult;

public class PagedResultMapper : Profile
{
    public PagedResultMapper()
    {
        CreateMap<PagedResult<Card>, PagedResult<CardGetDto>>();
    }
}
