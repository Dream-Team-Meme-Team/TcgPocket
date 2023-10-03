using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TcgPocket.Data;
using TcgPocket.Features.Cards.Dtos;
using TcgPocket.Shared;
using TcgPocket.Shared.Dtos;

namespace TcgPocket.Features.Cards.Queries;

public class GetPagedCardsDisplayQuery : IRequest<Response<List<CardDisplayDto>>>
{
}

public class GetPagedCardsDisplayQueryHandler : IRequestHandler<GetPagedCardsDisplayQuery, Response<List<CardDisplayDto>>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public GetPagedCardsDisplayQueryHandler(DataContext dataContext,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
    }

    public async Task<Response<List<CardDisplayDto>>> Handle(GetPagedCardsDisplayQuery query, CancellationToken cancellationToken)
    {
        var cardsQueryable = _dataContext.Set<Card>()
            .Include(x => x.Game)
            .Include(x => x.CardType)
            .Include(x => x.Rarity)
            .Include(x => x.Set)
            .OrderByDescending(x => x.Id)
            .ToList();

        if (cardsQueryable.IsNullOrEmpty()) return Error.AsResponse<List<CardDisplayDto>>("Cards not found");

        return _mapper.Map<List<CardDisplayDto>>(cardsQueryable).AsResponse();
    }
}
