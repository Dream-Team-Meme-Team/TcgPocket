using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.CardTypes.Queries;

public class GetCardTypeByIdRequest : IRequest<Response<CardTypeDto>>
{
    public int Id { get; set; }
}

public class GetCardTypeByIdRequestHandler : IRequestHandler<GetCardTypeByIdRequest, Response<CardTypeDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public GetCardTypeByIdRequestHandler(DataContext dataContext,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
    }
    
    public async Task<Response<CardTypeDto>> Handle(GetCardTypeByIdRequest request, CancellationToken cancellationToken)
    {
        var cardType = await _dataContext.Set<CardType>()
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (cardType is null) return Error.AsResponse<CardTypeDto>("Card Type not found", "id");

        return _mapper.Map<CardTypeDto>(cardType).AsResponse();
    }
}