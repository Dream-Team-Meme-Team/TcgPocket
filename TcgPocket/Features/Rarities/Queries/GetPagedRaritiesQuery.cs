using AutoMapper;
using FluentValidation;
using TcgPocket.Data;
using TcgPocket.Features.Rarities;
using TcgPocket.Features.Rarities.Dtos;
using TcgPocket.Shared.Filter;

namespace TcgPocket.Features.CardTypes.Queries;

public class GetPagedRaritiesQuery : FilteredPageRequest<Rarity, RarityGetDto, PagedRarityFilterDto>
{
}

public class GetPagedRaritiesQueryHandler
    : FilteredPageRequestHandler<GetPagedRaritiesQuery, Rarity, RarityGetDto, PagedRarityFilterDto>
{
    public GetPagedRaritiesQueryHandler(
        DataContext dataContext, IMapper mapper, IValidator<PagedRarityFilterDto> validator)
        : base(dataContext, mapper, validator)
    {
    }
}
