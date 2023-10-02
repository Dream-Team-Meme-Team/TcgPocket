using AutoMapper;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Features.Cards.Dtos;
using TcgPocket.Shared.Filter;

namespace TcgPocket.Features.Cards.Queries;

public class GetPagedCardsQuery :  FilteredPageRequest<Card, CardGetDto, PagedCardFilterDto>
{
}

public class GetPagedCardsQueryHandler :  FilteredPageRequestHandler<GetPagedCardsQuery, Card, CardGetDto, PagedCardFilterDto>
{
    public GetPagedCardsQueryHandler(
        DataContext dataContext, IMapper mapper, IValidator<PagedCardFilterDto> validator) 
        : base(dataContext, mapper, validator)
    {
    }

    protected override IQueryable<Card> GetEntities()
    {
        return base.GetEntities().Include(x => x.CardAttributes);
    }
}
