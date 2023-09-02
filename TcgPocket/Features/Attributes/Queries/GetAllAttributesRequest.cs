using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Attributes.Queries;

public class GetAllAttributesRequest : IRequest<Response<List<AttributeDto>>>
{
	public int Page { get; set; }
	public int PageSize { get; set; }
}

public class GetAllAttributesRequestHandler : IRequestHandler<GetAllAttributesRequest, Response<List<AttributeDto>>>
{
	private readonly DataContext _dataContext;
	private readonly IMapper _mapper;

	public GetAllAttributesRequestHandler(DataContext dataContext,
		IMapper mapper)
	{
		_dataContext = dataContext;
		_mapper = mapper;	
	}

	public async Task<Response<List<AttributeDto>>> Handle(GetAllAttributesRequest request, CancellationToken cancellationToken)
	{
		var attributes = await _dataContext.Set<Attribute>()
			.Skip((request.Page - 1) * request.PageSize)
			.Take(request.PageSize)
			.ToListAsync(cancellationToken: cancellationToken);

		if (attributes.IsNullOrEmpty()) return Error.AsResponse<List<AttributeDto>>("Attributes not found");

		return _mapper.Map<List<AttributeDto>>(attributes).AsResponse();
	}
}
