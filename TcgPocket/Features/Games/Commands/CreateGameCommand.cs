using AutoMapper;
using FluentValidation;
using MediatR;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Games.Commands;

public class CreateGameCommand : IRequest<Response<GameGetDto>>
{
    public GameDto Game { get; set; }
}

public class CreateGameCommandHandler : IRequestHandler<CreateGameCommand, Response<GameGetDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<CreateGameCommand> _validator;

    public CreateGameCommandHandler(DataContext dataContext,
        IValidator<CreateGameCommand> validator,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
    }
    
    public async Task<Response<GameGetDto>> Handle(CreateGameCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);
        
        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<GameGetDto>{Errors = errors};
        }

        var game = _mapper.Map<Game>(command.Game);
        await _dataContext.Set<Game>().AddAsync(game, cancellationToken);
        await _dataContext.SaveChangesAsync(cancellationToken);

        return _mapper.Map<GameGetDto>(game).AsResponse();
    }
}