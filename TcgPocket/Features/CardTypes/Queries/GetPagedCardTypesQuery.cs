using AutoMapper;
using FluentValidation;
using TcgPocket.Data;
using TcgPocket.Features.CardTypes.Dtos;
using TcgPocket.Shared.Filter;

namespace TcgPocket.Features.CardTypes.Queries;

public class GetPagedCardTypesQuery : FilteredPageRequest<CardType, CardTypeGetDto, PagedCardTypeFilterDto>
{
}

public class GetPagedCardTypesQueryHandler
    : FilteredPageRequestHandler<GetPagedCardTypesQuery, CardType, CardTypeGetDto, PagedCardTypeFilterDto>
{
    public GetPagedCardTypesQueryHandler(
        DataContext dataContext, IMapper mapper, IValidator<PagedCardTypeFilterDto> validator)
        : base(dataContext, mapper, validator)
    {
    }
}
