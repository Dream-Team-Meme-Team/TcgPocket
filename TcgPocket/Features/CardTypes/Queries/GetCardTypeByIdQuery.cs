using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.CardTypes.Queries;

public class GetCardTypeByIdQuery : IRequest<Response<CardTypeGetDto>>
{
    public int Id { get; set; }
}

public class GetCardTypeByIdQueryHandler : IRequestHandler<GetCardTypeByIdQuery, Response<CardTypeGetDto>>
{
    private readonly DataContext _dataContext;
    private readonly IValidator<GetCardTypeByIdQuery> _validator;
    private readonly IMapper _mapper;

    public GetCardTypeByIdQueryHandler(DataContext dataContext,
        IValidator<GetCardTypeByIdQuery> validator,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _validator = validator;
        _mapper = mapper;
    }
    
    public async Task<Response<CardTypeGetDto>> Handle(GetCardTypeByIdQuery query, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(query, cancellationToken);
        
        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<CardTypeGetDto>{Errors = errors};
        }
        
        var cardType = await _dataContext.Set<CardType>()
            .FirstOrDefaultAsync(x => x.Id == query.Id, cancellationToken);

        if (cardType is null) return Error.AsResponse<CardTypeGetDto>("Card Type not found", "id");

        return _mapper.Map<CardTypeGetDto>(cardType).AsResponse();
    }
}