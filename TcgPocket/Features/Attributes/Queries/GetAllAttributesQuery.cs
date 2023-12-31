﻿using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Attributes.Queries;

public class GetAllAttributesQuery : IRequest<Response<List<AttributeGetDto>>>
{
}

public class GetAllAttributesQueryHandler : IRequestHandler<GetAllAttributesQuery, Response<List<AttributeGetDto>>>
{
	private readonly DataContext _dataContext;
	private readonly IMapper _mapper;

	public GetAllAttributesQueryHandler(DataContext dataContext,
		IMapper mapper)
	{
		_dataContext = dataContext;
		_mapper = mapper;	
	}

	public async Task<Response<List<AttributeGetDto>>> Handle(GetAllAttributesQuery query, CancellationToken cancellationToken)
	{
		var attributes = await _dataContext.Set<Attribute>()
			.ToListAsync(cancellationToken: cancellationToken);

		return _mapper.Map<List<AttributeGetDto>>(attributes).AsResponse();
	}
}
