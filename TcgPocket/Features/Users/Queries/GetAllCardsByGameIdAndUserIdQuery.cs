using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TcgPocket.Data;
using TcgPocket.Features.Cards;
using TcgPocket.Features.UserCards;
using TcgPocket.Shared;
using TcgPocket.Shared.Queries;

namespace TcgPocket.Features.Users.Queries;

public class GetAllCardsByGameIdAndUserIdQuery : IRequest<Response<List<CardGetDto>>>
{
    public UserCardQueryByGameAndUserDto UserCardQueryByGameAndUser { get; set; }
}

public class GetAllUserCardsByGameIdQueryHandler : IRequestHandler<GetAllCardsByGameIdAndUserIdQuery, Response<List<CardGetDto>>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<GetAllCardsByGameIdAndUserIdQuery> _validator;

    public GetAllUserCardsByGameIdQueryHandler(DataContext dataContext, IMapper mapper, IValidator<GetAllCardsByGameIdAndUserIdQuery> validator)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
    }

    public async Task<Response<List<CardGetDto>>> Handle(GetAllCardsByGameIdAndUserIdQuery query, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(query, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<List<CardGetDto>> { Errors = errors };
        }

        var cards = await _dataContext.Set<UserCard>()
            .Include(x => x.User)
            .Include(x => x.Card)
            .Where(x => x.UserId == query.UserCardQueryByGameAndUser.UserId
                && x.Card.GameId == query.UserCardQueryByGameAndUser.GameId)
            .Select(x => x.Card)
            .ToListAsync(cancellationToken);

        var pagedData = await _dataContext.Set<Card>()
            .OrderByDescending(x => x.Id)
            .GetPagedAsync(1, 2);

        var mappedResults = _mapper.Map<List<CardGetDto>>(pagedData.Results);

        if (cards.IsNullOrEmpty()) return Error.AsResponse<List<CardGetDto>>("Cards not found", "gameId and userId");

        return _mapper.Map<List<CardGetDto>>(cards).AsResponse();
    }
}
