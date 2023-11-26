using AutoMapper;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TcgPocket.Data;
using TcgPocket.Features.Cards.Dtos;
using TcgPocket.Shared.Filter;

namespace TcgPocket.Features.Cards.Queries;

public class GetPagedCardsQuery :  FilteredPageRequest<Card, CardDisplayDto, PagedCardFilterDto>
{
}

public class GetPagedCardsQueryHandler
    : FilteredPageRequestHandler<GetPagedCardsQuery, Card, CardDisplayDto, PagedCardFilterDto>
{
    public GetPagedCardsQueryHandler(
        DataContext dataContext, IMapper mapper, IValidator<PagedCardFilterDto> validator) 
        : base(dataContext, mapper, validator)
    {
    }

    protected override IQueryable<Card> GetEntities()
    {
        return base.GetEntities()
            .Include(x => x.CardAttributes)
            .Include(x => x.Set)
            .Include(x => x.Rarity)
            .Include(x => x.Game)
            .Include(x => x.CardType);
    }

    protected override IQueryable<Card> FilterEntities(IQueryable<Card> query, GetPagedCardsQuery request)
    {
        query = base.FilterEntities(query, request);

        if (!request.Filter.GameIds.IsNullOrEmpty())
        {
            query = query.Where(x => request.Filter.GameIds.Any(y => y == x.GameId));
        }
        
        if (!request.Filter.SetIds.IsNullOrEmpty())
        {
            query = query.Where(x => request.Filter.SetIds.Any(y => y == x.SetId));
        }
        
        if (!request.Filter.RarityIds.IsNullOrEmpty())
        {
            query = query.Where(x => request.Filter.RarityIds.Any(y => y == x.RarityId));
        }
        
        if (!request.Filter.CardTypeIds.IsNullOrEmpty())
        {
            query = query.Where(x => request.Filter.CardTypeIds.Any(y => y == x.CardTypeId));
        }
        
        return query;
    }
}
