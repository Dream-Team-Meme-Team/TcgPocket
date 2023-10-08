using AutoMapper;
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
    private readonly IMapper _mapper;

    public GetAllCardTypesQueryHandler(DataContext dataContext,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
    }
    
    public async Task<Response<List<CardTypeGetDto>>> Handle(GetAllCardTypesQuery query, CancellationToken cancellationToken)
    {
        var cardTypes = await _dataContext.Set<CardType>()
            .ToListAsync(cancellationToken: cancellationToken);

        return _mapper.Map<List<CardTypeGetDto>>(cardTypes).AsResponse();
    }
}

