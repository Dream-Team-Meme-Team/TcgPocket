using AutoMapper;
using FluentValidation;
using MediatR;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Games.Commands;

public class CreateGameRequest : IRequest<Response<GameGetDto>>
{
    public GameDto Game { get; set; }
}

public class CreateGameRequestHandler : IRequestHandler<CreateGameRequest, Response<GameGetDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<CreateGameRequest> _validator;

    public CreateGameRequestHandler(DataContext dataContext,
        IValidator<CreateGameRequest> validator,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
    }
    
    public async Task<Response<GameGetDto>> Handle(CreateGameRequest request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);
        
        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<GameGetDto>{Errors = errors};
        }

        var game = _mapper.Map<Game>(request.Game);
        await _dataContext.Set<Game>().AddAsync(game, cancellationToken);
        await _dataContext.SaveChangesAsync(cancellationToken);

        return _mapper.Map<GameGetDto>(game).AsResponse();
    }
}