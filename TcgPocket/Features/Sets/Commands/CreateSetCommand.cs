using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Features.CardTypes.Commands;
using TcgPocket.Features.Games;
using TcgPocket.Shared;

namespace TcgPocket.Features.Sets.Commands;

public class CreateSetCommand : IRequest<Response<SetGetDto>>
{
    public SetDto Set { get; set; }
}

public class CreateSetCommandHandler : IRequestHandler<CreateSetCommand, Response<SetGetDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<CreateSetCommand> _validator;

    public CreateSetCommandHandler(DataContext dataContext, IValidator<CreateSetCommand> validator, IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;

    }

    public async Task<Response<SetGetDto>> Handle(CreateSetCommand command, CancellationToken cancellationToken)
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

        var cardType = _mapper.Map<Set>(command.Set);
        await _dataContext.Set<Set>().AddAsync(cardType, cancellationToken);
        await _dataContext.SaveChangesAsync(cancellationToken);

        return _mapper.Map<SetGetDto>(cardType).AsResponse();
    }
}