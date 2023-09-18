using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TcgPocket.Data;
using TcgPocket.Features.Cards;
using TcgPocket.Features.UserCards;
using TcgPocket.Shared;

namespace TcgPocket.Features.Users.Queries;

public class GetAllCardsByUserIdQuery : IRequest<Response<List<CardGetDto>>>
{
    public int Id { get; set; }
}

public class GetAllUserCardsByryHandler : IRequestHandler<GetAllCardsByUserIdQuery, Response<List<CardGetDto>>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<GetAllCardsByUserIdQuery> _validator;

    public GetAllUserCardsByryHandler(DataContext dataContext, IMapper mapper, IValidator<GetAllCardsByUserIdQuery> validator)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
    }

    public async Task<Response<List<CardGetDto>>> Handle(GetAllCardsByUserIdQuery query, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(query, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<List<CardGetDto>> { Errors = errors };
        }

        var cards = await _dataContext.Set<UserCard>()
            .Include(x => x.User)
            .Where(x => x.UserId == query.Id)
            .Select(x => x.Card)
            .ToListAsync(cancellationToken);

        if (cards.IsNullOrEmpty()) return Error.AsResponse<List<CardGetDto>>("Cards not found", "id");

        return _mapper.Map<List<CardGetDto>>(cards).AsResponse();
    }
}
