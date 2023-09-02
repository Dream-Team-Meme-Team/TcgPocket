using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Games.Commands;

public class UpdateGameCommand : IRequest<Response<GameGetDto>>
{
    public int Id { get; set; }
    public GameDto Game { get; set; }
}

public class UpdateGameCommandHandler : IRequestHandler<UpdateGameCommand, Response<GameGetDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<UpdateGameCommand> _validator;

    public UpdateGameCommandHandler(DataContext dataContext,
        IValidator<UpdateGameCommand> validator,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
    }
    
    public async Task<Response<GameGetDto>> Handle(UpdateGameCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);
        
        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<GameGetDto>{Errors = errors};
        }

        var game = await _dataContext.Set<Game>()
            .FirstOrDefaultAsync(x => x.Id == command.Id, cancellationToken);
        
        if (game is null) return Error.AsResponse<GameGetDto>("Game not found", "id");

        _mapper.Map(command.Game, game);
        await _dataContext.SaveChangesAsync(cancellationToken);

        return _mapper.Map<GameGetDto>(game).AsResponse();
    }
}