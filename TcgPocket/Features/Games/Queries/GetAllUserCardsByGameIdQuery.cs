using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TcgPocket.Data;
using TcgPocket.Features.UserCards;
using TcgPocket.Shared;

namespace TcgPocket.Features.Games.Queries;

public class GetAllUserCardsByGameIdQuery : IRequest<Response<List<UserCardGetDto>>>
{
    public int Id { get; set; }
}

public class GetAllUserCardsByGameIdQueryHandler : IRequestHandler<GetAllUserCardsByGameIdQuery, Response<List<UserCardGetDto>>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<GetAllUserCardsByGameIdQuery> _validator;

    public GetAllUserCardsByGameIdQueryHandler(DataContext dataContext, IMapper mapper, IValidator<GetAllUserCardsByGameIdQuery> validator)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
    }

    public async Task<Response<List<UserCardGetDto>>> Handle(GetAllUserCardsByGameIdQuery query, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(query, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<List<UserCardGetDto>> { Errors = errors };
        }

        if (!await _dataContext.Set<Game>().AnyAsync(x => x.Id == query.Id, cancellationToken))
        {
            return Error.AsResponse<List<UserCardGetDto>>("Game not found", "gameId");
        }

        var userCards = await _dataContext.Set<UserCard>().Select(x => x.Card.Id == query.Id).ToListAsync(cancellationToken);

        if (userCards.IsNullOrEmpty()) return Error.AsResponse<List<UserCardGetDto>>("UserCards not found", "gameId");

        return _mapper.Map<List<UserCardGetDto>>(userCards).AsResponse();
    }
}
