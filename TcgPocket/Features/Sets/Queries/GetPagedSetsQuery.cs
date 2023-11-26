using AutoMapper;
using FluentValidation;
using TcgPocket.Data;
using TcgPocket.Features.Sets.Dtos;
using TcgPocket.Shared.Filter;

namespace TcgPocket.Features.Sets.Queries;

public class GetPagedSetsQuery : FilteredPageRequest<Set, SetGetDto, PagedSetFilterDto>
{
}

public class GetPagedSetsQueryHandler
    : FilteredPageRequestHandler<GetPagedSetsQuery, Set, SetGetDto, PagedSetFilterDto>
{
    public GetPagedSetsQueryHandler(
        DataContext dataContext, IMapper mapper, IValidator<PagedSetFilterDto> validator)
        : base(dataContext, mapper, validator)
    {
    }
}
