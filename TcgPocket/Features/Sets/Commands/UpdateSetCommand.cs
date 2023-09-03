using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Features.Games;
using TcgPocket.Shared;

namespace TcgPocket.Features.Sets.Commands;

public class UpdateSetCommand : IRequest<Response<SetGetDto>>
{
    public int Id { get; set; }
    public SetDto Set { get; set; }
}

public class UpdateSetCommandHandler : IRequestHandler<UpdateSetCommand, Response<SetGetDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<UpdateSetCommand> _validator;

    public UpdateSetCommandHandler(DataContext dataContext,
        IValidator<UpdateSetCommand> validator,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
    }

    public async Task<Response<SetGetDto>> Handle(UpdateSetCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<SetGetDto> { Errors = errors };
        }

        if (!await _dataContext.Set<Game>().AnyAsync(x => x.Id == command.Set.GameId, cancellationToken))
        {
            return Error.AsResponse<SetGetDto>("Game not found", "gameId");
        }

        var set = await _dataContext.Set<Set>()
            .FirstOrDefaultAsync(x => x.Id == command.Id, cancellationToken);

        if (set is null) return Error.AsResponse<SetGetDto>("Set not found", "id");

        _mapper.Map(command.Set, set);
        await _dataContext.SaveChangesAsync(cancellationToken);

        return _mapper.Map<SetGetDto>(set).AsResponse();
    }
}