using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Attributes.Queries;

public class GetAttributeByIdQuery : IRequest<Response<AttributeDto>>
{
	public int Id { get; set; }
}

public class GetAttributeByIdQueryHandler : IRequestHandler<GetAttributeByIdQuery, Response<AttributeDto>>
{
	private readonly DataContext _dataContext;
	private readonly IMapper _mapper;

	public GetAttributeByIdQueryHandler(DataContext dataContext,
		IMapper mapper)
	{
		_dataContext = dataContext;
		_mapper = mapper;
	}

	public async Task<Response<AttributeDto>> Handle(GetAttributeByIdQuery request, CancellationToken cancellationToken)
	{
		var attribute = await _dataContext.Set<Attribute>()
			.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

		if (attribute is null) return Error.AsResponse<AttributeDto>("Attribute not found", "id");

		return _mapper.Map<AttributeDto>(attribute).AsResponse();
	}
}
