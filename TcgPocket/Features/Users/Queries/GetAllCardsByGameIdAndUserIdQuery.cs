using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TcgPocket.Data;
using TcgPocket.Features.Cards;
using TcgPocket.Features.UserCards;
using TcgPocket.Features.Users.Dtos;
using TcgPocket.Shared;
using TcgPocket.Shared.PagedResult;

namespace TcgPocket.Features.Users.Queries;

public class GetAllCardsByGameIdAndUserIdQuery : IRequest<Response<PagedResult<CardGetDto>>>
{
    public UserCardGameDto UserCardGame { get; set; }
}

public class GetAllCardsByGameIdQueryHandler : IRequestHandler<GetAllCardsByGameIdAndUserIdQuery, Response<PagedResult<CardGetDto>>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<GetAllCardsByGameIdAndUserIdQuery> _validator;

    public GetAllCardsByGameIdQueryHandler(DataContext dataContext, IMapper mapper, IValidator<GetAllCardsByGameIdAndUserIdQuery> validator)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
    }

    public async Task<Response<PagedResult<CardGetDto>>> Handle(GetAllCardsByGameIdAndUserIdQuery query, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(query, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<PagedResult<CardGetDto>> { Errors = errors };
        }

        var cards = await _dataContext.Set<UserCard>()
            .Include(x => x.User)
            .Include(x => x.Card)
            .Where(x => x.UserId == query.UserCardGame.UserId
                && x.Card.GameId == query.UserCardGame.GameId)
            .Select(x => x.Card)
            .OrderByDescending(x => x.Id)
            .GetPagedAsync(query.UserCardGame.CurrentPage, query.UserCardGame.PageSize, cancellationToken);

        if (cards.Items.IsNullOrEmpty()) return Error.AsResponse<PagedResult<CardGetDto>>("Cards not found", "gameId and userId");

        return _mapper.Map<PagedResult<CardGetDto>>(cards).AsResponse();
    }
}
