using AutoMapper;
using MediatR;
using Microsoft.IdentityModel.Tokens;
using TcgPocket.Data;
using TcgPocket.Shared;
using TcgPocket.Shared.Dtos;
using TcgPocket.Shared.PagedResult;

namespace TcgPocket.Features.Cards.Queries;

public class GetAllCardsPaginatedQuery : IRequest<Response<PagedResult<CardGetDto>>>
{
    public PageDto PageDto { get; set; }
}

public class GetAllCardsPaginatedQueryHandler : IRequestHandler<GetAllCardsPaginatedQuery, Response<PagedResult<CardGetDto>>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public GetAllCardsPaginatedQueryHandler(DataContext dataContext,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
    }

    public async Task<Response<PagedResult<CardGetDto>>> Handle(GetAllCardsPaginatedQuery query, CancellationToken cancellationToken)
    {
        var cardsQueryable = _dataContext.Set<Card>()
            .OrderByDescending(x => x.Id);

        var pagedCards = await cardsQueryable.GetPagedAsync(
            query.PageDto.CurrentPage,
            query.PageDto.PageSize,
            cancellationToken);

        if (pagedCards.Items.IsNullOrEmpty()) return Error.AsResponse<PagedResult<CardGetDto>>("Cards not found");

        return _mapper.Map<PagedResult<CardGetDto>>(pagedCards).AsResponse();
    }
}
