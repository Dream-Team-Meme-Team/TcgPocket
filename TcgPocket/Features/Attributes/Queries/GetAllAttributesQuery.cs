using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Attributes.Queries;

public class GetAllAttributesQuery : IRequest<Response<List<AttributeGetDto>>>
{
}

public class GetAllAttributesQueryHandler : IRequestHandler<GetAllAttributesQuery, Response<List<AttributeGetDto>>>
{
	private readonly DataContext _dataContext;
	private readonly IValidator<GetAllAttributesQuery> _validator;
	private readonly IMapper _mapper;

	public GetAllAttributesQueryHandler(DataContext dataContext,
		IValidator<GetAllAttributesQuery> validator,
		IMapper mapper)
	{
		_dataContext = dataContext;
		_validator = validator;
		_mapper = mapper;	
	}

	public async Task<Response<List<AttributeGetDto>>> Handle(GetAllAttributesQuery query, CancellationToken cancellationToken)
	{
		var validationResult = await _validator.ValidateAsync(query, cancellationToken);

		if (!validationResult.IsValid)
		{
			var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<List<AttributeGetDto>>{Errors = errors};
		}

		var attributes = await _dataContext.Set<Attribute>()
			.ToListAsync(cancellationToken: cancellationToken);

		if (attributes.IsNullOrEmpty()) return Error.AsResponse<List<AttributeGetDto>>("Attributes not found");

		return _mapper.Map<List<AttributeGetDto>>(attributes).AsResponse();
	}
}
