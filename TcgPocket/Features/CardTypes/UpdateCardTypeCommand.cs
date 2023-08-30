using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Common;
using TcgPocket.Data;
using TcgPocket.Features.Games;

namespace TcgPocket.Features.CardTypes;

public class UpdateCardTypeCommand : IRequest<Response<CardTypeGetDto>>
{
    public int Id { get; set; }
    public CardTypeDto CardType { get; set; }
}

public class UpdateCardTypeHandler : IRequestHandler<UpdateCardTypeCommand, Response<CardTypeGetDto>>
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
    
    public async Task<Response<CardTypeGetDto>> Handle(UpdateCardTypeCommand request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request.CardType, cancellationToken);
        
        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<CardTypeGetDto>{Errors = errors};
        }
        
        if (!await _dataContext.Set<Game>().AnyAsync(x => x.Id == request.CardType.GameId, cancellationToken))
        {
            return Error.AsResponse<CardTypeGetDto>("Game not found", "gameId");
        }

        var cardType = await _dataContext.Set<CardType>()
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        
        if (cardType is null) return Error.AsResponse<CardTypeGetDto>("Card Type not found", "id");

        _mapper.Map(request.CardType, cardType);
        await _dataContext.SaveChangesAsync(cancellationToken);
        
        return _mapper.Map<CardTypeGetDto>(cardType).AsResponse();
    }
}