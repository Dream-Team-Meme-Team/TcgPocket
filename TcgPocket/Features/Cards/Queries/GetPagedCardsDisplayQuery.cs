using AutoMapper;
using FluentValidation;
using TcgPocket.Data;
using TcgPocket.Features.Cards.Dtos;
using TcgPocket.Features.Cards;
using TcgPocket.Shared.Filter;
using Microsoft.EntityFrameworkCore;

public class GetPagedCardsDisplayQuery : FilteredPageRequest<Card, CardDisplayDto, PagedCardFilterDto>
{
}

public class GetPagedCardsDisplayQueryHandler
    : FilteredPageRequestHandler<GetPagedCardsDisplayQuery, Card, CardDisplayDto, PagedCardFilterDto>
{
    public GetPagedCardsDisplayQueryHandler(
        DataContext dataContext, IMapper mapper, IValidator<PagedCardFilterDto> validator)
        : base(dataContext, mapper, validator)
    {
    }

    protected override IQueryable<Card> GetEntities()
    {
        return base.GetEntities()
            .Include(x => x.CardAttributes)
            .Include(x => x.Game)
            .Include(x => x.CardType)
            .Include(x => x.Rarity)
            .Include(x => x.Set);
    }
}