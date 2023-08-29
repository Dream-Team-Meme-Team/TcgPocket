using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Common;
using TcgPocket.Data;

namespace TcgPocket.Features.Games;

public class UpdateGameCommand : GameDto, IRequest<Response<GameDto>>
{
    public int Id { get; set; }
}

public class UpdateGameHandler : IRequestHandler<UpdateGameCommand, Response<GameDto>>
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
    
    public async Task<Response<GameDto>> Handle(UpdateGameCommand request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);
        
        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<GameDto>{Errors = errors};
        }

        var game = await _dataContext.Set<Game>()
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        
        if (game is null) return Error.AsResponse<GameDto>("Game not found", "id");

        _mapper.Map(request, game);
        await _dataContext.SaveChangesAsync(cancellationToken);

        return _mapper.Map<GameDto>(game).AsResponse();
    }
}