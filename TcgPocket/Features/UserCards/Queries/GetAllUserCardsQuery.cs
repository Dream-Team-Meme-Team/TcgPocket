using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.UserCards.Queries;

public class GetAllUserCardsQuery : IRequest<Response<List<UserCardGetDto>>>
{
    public int Id { get; set; }
}

public class GetAllUserCardsQueryHandler : IRequestHandler<GetAllUserCardsQuery, Response<List<UserCardGetDto>>>
{
	private readonly DataContext _dataContext;
	private readonly IMapper _mapper;
	public GetAllUserCardsQueryHandler(DataContext dataContext, 
		IMapper mapper)
	{
		_dataContext = dataContext;
		_mapper = mapper;
	}

	public async Task<Response<List<UserCardGetDto>>> Handle(GetAllUserCardsQuery query, CancellationToken cancellationToken)
	{
		var userCards = await _dataContext.Set<UserCard>()
			.ToListAsync(cancellationToken);

		return _mapper.Map<List<UserCardGetDto>>(userCards).AsResponse();
    }
}
