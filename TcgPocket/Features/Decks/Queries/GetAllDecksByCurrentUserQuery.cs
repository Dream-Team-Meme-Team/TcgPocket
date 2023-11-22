using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Features.Users;
using TcgPocket.Shared;

namespace TcgPocket.Features.Decks.Queries;

public class GetAllDecksByCurrentUserQuery : IRequest<Response<List<DeckDetailDto>>>
{
}

public class GetAllDecksQueryHandler : IRequestHandler<GetAllDecksByCurrentUserQuery, Response<List<DeckDetailDto>>>
{
    private readonly SignInManager<User> _signInManager;
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public GetAllDecksQueryHandler(DataContext dataContext,
        IMapper mapper, SignInManager<User> signInManager)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _signInManager = signInManager;
    }

    public async Task<Response<List<DeckDetailDto>>> Handle(GetAllDecksByCurrentUserQuery query, CancellationToken cancellationToken)
    {
        var user = await _signInManager.GetSignedInUserAsync();

        if (user is null) return Error.AsResponse<List<DeckDetailDto>>("No user logged in", "user");

        var decks = await _dataContext.Set<Deck>()
            .Where(x => x.UserId == user.Id)
            .Include(x => x.DeckCards)
            .ThenInclude(y => y.Card)
            .ToListAsync(cancellationToken);

        return _mapper.Map<List<DeckDetailDto>>(decks).AsResponse();
    }
}

