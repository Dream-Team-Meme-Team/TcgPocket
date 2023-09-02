using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Games.Queries;

public class GetAllGamesQuery : IRequest<Response<List<GameGetDto>>>
{
}

public class GetAllGamesQueryHandler : IRequestHandler<GetAllGamesQuery, Response<List<GameGetDto>>>
{
    private readonly DataContext _dataContext;
    private readonly IValidator<GetAllGamesQuery> _validator;
    private readonly IMapper _mapper;

    public GetAllGamesQueryHandler(DataContext dataContext,
        IValidator<GetAllGamesQuery> validator,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _validator = validator;
        _mapper = mapper;
    }
    
    public async Task<Response<List<GameGetDto>>> Handle(GetAllGamesQuery query, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(query, cancellationToken);
        
        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<List<GameGetDto>>{Errors = errors};
        }
        
        var games = await _dataContext.Set<Game>()
            .ToListAsync(cancellationToken: cancellationToken);

        if (games.IsNullOrEmpty()) return Error.AsResponse<List<GameGetDto>>("Card Types not found");

        return _mapper.Map<List<GameGetDto>>(games).AsResponse();
    }
}