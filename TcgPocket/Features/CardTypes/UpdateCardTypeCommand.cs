using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Common;
using TcgPocket.Data;
using TcgPocket.Features.Games;

namespace TcgPocket.Features.CardTypes;

public class UpdateCardTypeCommand : CardTypeDto, IRequest<Response<CardTypeDto>>
{
    public int Id { get; set; }
}

public class UpdateCardTypeHandler : IRequestHandler<UpdateCardTypeCommand, Response<CardTypeDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<CardTypeDto> _validator;

    public UpdateCardTypeHandler(DataContext dataContext,
        IValidator<CardTypeDto> validator,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
    }
    
    public async Task<Response<CardTypeDto>> Handle(UpdateCardTypeCommand request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);
        
        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<CardTypeDto>{Errors = errors};
        }
        
        if (!await _dataContext.Set<Game>().AnyAsync(x => x.Id == request.GameId, cancellationToken))
        {
            return Error.AsResponse<CardTypeDto>("Game not found", "gameId");
        }

        var cardType = await _dataContext.Set<CardType>()
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        
        if (cardType is null) return Error.AsResponse<CardTypeDto>("Card Type not found", "id");

        _mapper.Map(request, cardType);
        await _dataContext.SaveChangesAsync(cancellationToken);
        
        return _mapper.Map<CardTypeDto>(cardType).AsResponse();
    }
}