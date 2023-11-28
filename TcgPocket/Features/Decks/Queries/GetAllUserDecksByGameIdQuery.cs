using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Features.Users;
using TcgPocket.Shared;

namespace TcgPocket.Features.Decks.Queries;

public class GetAllUserDecksByGameIdQuery : IRequest<Response<List<DeckDisplayDto>>>
{
    public int GameId { get; set; }
}

public class GetAllUserDecksByGameIdQueryHandler : IRequestHandler<GetAllUserDecksByGameIdQuery, Response<List<DeckDisplayDto>>>
{
    private readonly SignInManager<User> _signInManager;
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public GetAllUserDecksByGameIdQueryHandler(DataContext dataContext,
        IMapper mapper, SignInManager<User> signInManager)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _signInManager = signInManager;
    }

    public async Task<Response<List<DeckDisplayDto>>> Handle(GetAllUserDecksByGameIdQuery query, CancellationToken cancellationToken)
    {
        var user = await _signInManager.GetSignedInUserAsync();

        if (user is null) return Error.AsResponse<List<DeckDisplayDto>>("No user logged in", "user");

        var decks = await _dataContext.Set<Deck>()
            .Where(x => x.UserId == user.Id
                && x.GameId == query.GameId)
            .Include(x => x.DeckCards)
            .ThenInclude(y => y.Card)
            .ThenInclude(y => y.Game)
            .ThenInclude(y => y.CardTypes)
            .Include(x => x.DeckCards)
            .ThenInclude(y => y.Card)
            .ThenInclude(y => y.Rarity)
            .Include(x => x.DeckCards)
            .ThenInclude(y => y.Card)
            .ThenInclude(y => y.Set)
            .ToListAsync(cancellationToken);

        return _mapper.Map<List<DeckDisplayDto>>(decks).AsResponse();
    }
}

