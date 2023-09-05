using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Decks.Queries;

public class GetAllDecksQuery : IRequest<Response<List<DeckGetDto>>>
{
}

public class GetAllDecksQueryHandler : IRequestHandler<GetAllDecksQuery, Response<List<DeckGetDto>>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public GetAllDecksQueryHandler(DataContext dataContext,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
    }

    public async Task<Response<List<DeckGetDto>>> Handle(GetAllDecksQuery query, CancellationToken cancellationToken)
    {
        var decks = await _dataContext.Set<Deck>()
            .ToListAsync(cancellationToken: cancellationToken);

        if (decks.IsNullOrEmpty()) return Error.AsResponse<List<DeckGetDto>>("Decks not found");

        return _mapper.Map<List<DeckGetDto>>(decks).AsResponse();
    }
}

