using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.CardTypes.Queries;

public class GetAllCardTypesRequest : IRequest<Response<List<CardTypeDto>>>
{
    public int Page { get; set; }
    public int PageSize { get; set; }
}

public class GetAllCardTypesRequestHandler : IRequestHandler<GetAllCardTypesRequest, Response<List<CardTypeDto>>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public GetAllCardTypesRequestHandler(DataContext dataContext,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
    }
    
    public async Task<Response<List<CardTypeDto>>> Handle(GetAllCardTypesRequest request, CancellationToken cancellationToken)
    {
        var cardTypes = await _dataContext.Set<CardType>()
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToListAsync(cancellationToken: cancellationToken);

        if (cardTypes.IsNullOrEmpty()) return Error.AsResponse<List<CardTypeDto>>("Card Types not found");

        return _mapper.Map<List<CardTypeDto>>(cardTypes).AsResponse();
    }
}

