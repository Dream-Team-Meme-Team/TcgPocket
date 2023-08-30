using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Common;
using TcgPocket.Data;

namespace TcgPocket.Features.Games;

public class UpdateGameCommand : IRequest<Response<GameGetDto>>
{
    public int Id { get; set; }
    public GameDto Game { get; set; }
}

public class UpdateGameHandler : IRequestHandler<UpdateGameCommand, Response<GameGetDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<GameDto> _validator;

    public UpdateGameHandler(DataContext dataContext,
        IValidator<GameDto> validator,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
    }
    
    public async Task<Response<GameGetDto>> Handle(UpdateGameCommand request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request.Game, cancellationToken);
        
        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<GameGetDto>{Errors = errors};
        }

        var game = await _dataContext.Set<Game>()
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        
        if (game is null) return Error.AsResponse<GameGetDto>("Game not found", "id");

        _mapper.Map(request.Game, game);
        await _dataContext.SaveChangesAsync(cancellationToken);

        return _mapper.Map<GameGetDto>(game).AsResponse();
    }
}