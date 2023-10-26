using AutoMapper;
using FluentValidation;
using TcgPocket.Data;
using TcgPocket.Features.Attributes.Dtos;
using TcgPocket.Shared.Filter;

namespace TcgPocket.Features.Attributes.Queries;

public class GetPagedAttributesQuery :  FilteredPageRequest<Attribute, AttributeGetDto, PagedAttributeFilterDto>
{
}

public class GetPagedAttributesQueryHandler
    : FilteredPageRequestHandler<GetPagedAttributesQuery, Attribute, AttributeGetDto, PagedAttributeFilterDto>
{
    public GetPagedAttributesQueryHandler(
        DataContext dataContext, IMapper mapper, IValidator<PagedAttributeFilterDto> validator) 
        : base(dataContext, mapper, validator)
    {
    }
}
