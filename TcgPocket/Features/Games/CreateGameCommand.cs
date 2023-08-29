using AutoMapper;
using FluentValidation;
using MediatR;
using TcgPocket.Common;
using TcgPocket.Data;

namespace TcgPocket.Features.Games;

public class CreateGameCommand : GameDto, IRequest<Response<GameDto>>
{
}

public class CreateGameHandler : IRequestHandler<CreateGameCommand, Response<GameDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<GameDto> _validator;

    public CreateGameHandler(DataContext dataContext,
        IValidator<GameDto> validator,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
    }
    
    public async Task<Response<GameDto>> Handle(CreateGameCommand request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);
        
        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<GameDto>{Errors = errors};
        }

        var game = _mapper.Map<Game>(request);
        await _dataContext.Set<Game>().AddAsync(game, cancellationToken);
        await _dataContext.SaveChangesAsync(cancellationToken);

        return _mapper.Map<GameDto>(game).AsResponse();
    }
}