using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.CardTypes.Commands;

public class DeleteCardTypeCommand : IRequest<Response>
{
    public int Id { get; set; }
}

public class DeleteCardTypeCommandHandler : IRequestHandler<DeleteCardTypeCommand, Response>
{
    private readonly DataContext _dataContext;
    private readonly IValidator<DeleteCardTypeCommand> _validator;
    private readonly IMapper _mapper;

    public DeleteCardTypeCommandHandler(DataContext dataContext,
        IValidator<DeleteCardTypeCommand> validator,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _validator = validator;
        _mapper = mapper;
    }
    public async Task<Response> Handle(DeleteCardTypeCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);
        
        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response{Errors = errors};
        }
        
        var cardType = await _dataContext.Set<CardType>()
            .FirstOrDefaultAsync(x => x.Id == command.Id, cancellationToken);
        
        if (cardType is null) return Error.AsResponse("Card Type not found", "id");

        _dataContext.Set<CardType>().Remove(cardType);
        await _dataContext.SaveChangesAsync(cancellationToken);
        
        return Response.Success;
    }
}