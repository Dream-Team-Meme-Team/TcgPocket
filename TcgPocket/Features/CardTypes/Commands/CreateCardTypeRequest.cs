using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Features.Games;
using TcgPocket.Shared;

namespace TcgPocket.Features.CardTypes.Commands;

public class CreateCardTypeRequest : IRequest<Response<CardTypeGetDto>>
{
    public CardTypeDto CardType { get; set; }
}

public class CreateCardTypeRequestHandler : IRequestHandler<CreateCardTypeRequest, Response<CardTypeGetDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<CreateCardTypeRequest> _validator;

    public CreateCardTypeRequestHandler(DataContext dataContext,
        IValidator<CreateCardTypeRequest> validator,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
    }
    
    public async Task<Response<CardTypeGetDto>> Handle(CreateCardTypeRequest request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);
        
        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<CardTypeGetDto>{Errors = errors};
        }
        
        if (!await _dataContext.Set<Game>().AnyAsync(x => x.Id == request.CardType.GameId, cancellationToken))
        {
            return Error.AsResponse<CardTypeGetDto>("Game not found", "gameId");
        }

        var cardType = _mapper.Map<CardType>(request.CardType);
        await _dataContext.Set<CardType>().AddAsync(cardType, cancellationToken);
        await _dataContext.SaveChangesAsync(cancellationToken);

        return _mapper.Map<CardTypeGetDto>(cardType).AsResponse();
    }
}