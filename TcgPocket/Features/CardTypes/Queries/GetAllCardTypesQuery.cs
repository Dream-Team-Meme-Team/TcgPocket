using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.CardTypes.Queries;

public class GetAllCardTypesQuery : IRequest<Response<List<CardTypeGetDto>>>
{
}

public class GetAllCardTypesQueryHandler : IRequestHandler<GetAllCardTypesQuery, Response<List<CardTypeGetDto>>>
{
    private readonly DataContext _dataContext;
    private readonly IValidator<GetAllCardTypesQuery> _validator;
    private readonly IMapper _mapper;

    public GetAllCardTypesQueryHandler(DataContext dataContext,
        IValidator<GetAllCardTypesQuery> validator,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _validator = validator;
        _mapper = mapper;
    }
    
    public async Task<Response<List<CardTypeGetDto>>> Handle(GetAllCardTypesQuery query, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(query, cancellationToken);
        
        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<List<CardTypeGetDto>>{Errors = errors};
        }
        
        var cardTypes = await _dataContext.Set<CardType>()
            .ToListAsync(cancellationToken: cancellationToken);

        if (cardTypes.IsNullOrEmpty()) return Error.AsResponse<List<CardTypeGetDto>>("Card Types not found");

        return _mapper.Map<List<CardTypeGetDto>>(cardTypes).AsResponse();
    }
}

