using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Common;
using TcgPocket.Data;

namespace TcgPocket.Features.CardTypes;

public class GetCardTypeByIdQuery : IRequest<Response<CardTypeDto>>
{
    public int Id { get; set; }
}

public class GetCardTypeByIdHandler : IRequestHandler<GetCardTypeByIdQuery, Response<CardTypeDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public GetCardTypeByIdHandler(DataContext dataContext,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
    }
    
    public async Task<Response<CardTypeDto>> Handle(GetCardTypeByIdQuery request, CancellationToken cancellationToken)
    {
        var cardType = await _dataContext.Set<CardType>()
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (cardType is null) return Error.AsResponse<CardTypeDto>("Card Type not found", "id");

        return _mapper.Map<CardTypeDto>(cardType).AsResponse();
    }
}