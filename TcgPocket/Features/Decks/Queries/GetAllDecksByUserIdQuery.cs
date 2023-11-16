using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Decks.Queries;

public class GetAllDecksByUserIdQuery : IRequest<Response<List<DeckDetailDto>>>
{
    public int UserId { get; set; }
}

public class GetAllDecksQueryHandler : IRequestHandler<GetAllDecksByUserIdQuery, Response<List<DeckDetailDto>>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public GetAllDecksQueryHandler(DataContext dataContext,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
    }

    public async Task<Response<List<DeckDetailDto>>> Handle(GetAllDecksByUserIdQuery query, CancellationToken cancellationToken)
    {
        var decks = await _dataContext.Set<Deck>()
            .Where(x => x.UserId == query.UserId)
            .Include(x => x.DeckCards)
            .ThenInclude(y => y.Card)
            .ToListAsync(cancellationToken);

        return _mapper.Map<List<DeckDetailDto>>(decks).AsResponse();
    }
}

