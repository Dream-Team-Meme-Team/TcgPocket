using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Games.Queries;

public class GetGameByIdQuery : IRequest<Response<GameGetDto>>
{
    public int Id { get; set; }
}

public class GetGameByIdQueryHandler : IRequestHandler<GetGameByIdQuery, Response<GameGetDto>>
{
    private readonly DataContext _dataContext;
    private readonly IValidator<GetGameByIdQuery> _validator;
    private readonly IMapper _mapper;

    public GetGameByIdQueryHandler(DataContext dataContext,
        IValidator<GetGameByIdQuery> validator,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _validator = validator;
        _mapper = mapper;
    }
    
    public async Task<Response<GameGetDto>> Handle(GetGameByIdQuery query, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(query, cancellationToken);
        
        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<GameGetDto>{Errors = errors};
        }
        
        var game = await _dataContext.Set<Game>()
            .FirstOrDefaultAsync(x => x.Id == query.Id, cancellationToken);

        if (game is null) return Error.AsResponse<GameGetDto>("Game not found", "id");

        return _mapper.Map<GameGetDto>(game).AsResponse();
    }
}