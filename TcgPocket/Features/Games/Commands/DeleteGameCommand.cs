using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Games.Commands;

public class DeleteGameCommand : IRequest<Response>
{
    public int Id { get; set; }
}

public class DeleteGameCommandHandler : IRequestHandler<DeleteGameCommand, Response>
{
    private readonly DataContext _dataContext;
    private readonly IValidator<DeleteGameCommand> _validator;
    private readonly IMapper _mapper;

    public DeleteGameCommandHandler(DataContext dataContext,
        IValidator<DeleteGameCommand> validator,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _validator = validator;
        _mapper = mapper;
    }
    public async Task<Response> Handle(DeleteGameCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);
        
        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response{Errors = errors};
        }
        
        var game = await _dataContext.Set<Game>()
            .FirstOrDefaultAsync(x => x.Id == command.Id, cancellationToken);
        
        if (game is null) return Error.AsResponse("Game not found", "id");

        _dataContext.Set<Game>().Remove(game);
        await _dataContext.SaveChangesAsync(cancellationToken);
        
        return Response.Success;
    }
}