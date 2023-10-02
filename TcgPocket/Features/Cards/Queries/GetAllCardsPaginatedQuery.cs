using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TcgPocket.Data;
using TcgPocket.Shared;
using TcgPocket.Shared.Dtos;
using TcgPocket.Shared.PagedResult;

namespace TcgPocket.Features.Cards.Queries;

public class GetAllCardsPaginatedQuery : IRequest<Response<PagedResult<CardDetailDto>>>
{
    public PageDto PageDto { get; set; }
}

public class GetAllCardsPaginatedQueryHandler : IRequestHandler<GetAllCardsPaginatedQuery, Response<PagedResult<CardDetailDto>>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public GetAllCardsPaginatedQueryHandler(DataContext dataContext,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
    }

    public async Task<Response<PagedResult<CardDetailDto>>> Handle(GetAllCardsPaginatedQuery query, CancellationToken cancellationToken)
    {
        var cardsQueryable = _dataContext.Set<Card>().Include(x => x.CardAttributes)
            .OrderByDescending(x => x.Id);

        var pagedCards = await cardsQueryable.GetPagedAsync(
            query.PageDto.CurrentPage,
            query.PageDto.PageSize,
            cancellationToken);

        if (pagedCards.Items.IsNullOrEmpty()) return Error.AsResponse<PagedResult<CardDetailDto>>("Cards not found");

        return _mapper.Map<PagedResult<CardDetailDto>>(pagedCards).AsResponse();
    }
}
