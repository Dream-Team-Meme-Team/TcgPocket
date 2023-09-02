using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Features.Games;
using TcgPocket.Shared;

namespace TcgPocket.Features.Attributes.Commands;

public class UpdateAttributeRequest : IRequest<Response<AttributeGetDto>>
{
	public int Id { get; set; }
	public AttributeDto Attribute { get; set; }
}

public class UpdateAttributeRequestHandler : IRequestHandler<UpdateAttributeRequest, Response<AttributeGetDto>>
{
	private readonly DataContext _dataContext;
	private readonly IMapper _mapper;
	private readonly IValidator<UpdateAttributeRequest> _validator;

	public UpdateAttributeRequestHandler(DataContext dataContext,
		IValidator<UpdateAttributeRequest> validator,
		IMapper mapper)
	{
		_dataContext = dataContext;
		_mapper = mapper;
		_validator = validator;
	}

	public async Task<Response<AttributeGetDto>> Handle(UpdateAttributeRequest request, CancellationToken cancellationToken)
	{
		var validationResult = await _validator.ValidateAsync(request, cancellationToken);

		if (validationResult.IsValid)
		{
			var errors = _mapper.Map<List<Error>>(validationResult.Errors);
			return new Response<AttributeGetDto>{Errors = errors};
		}

		if (!await _dataContext.Set<Game>().AnyAsync(x => x.Id == request.Attribute.GameId, cancellationToken))
		{
			return Error.AsResponse<AttributeGetDto>("Game not found", "gameId");
		}

		var attribute = await _dataContext.Set<Attribute>()
			.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

		if (attribute is null) return Error.AsResponse<AttributeGetDto>("Attribute not found", "id");

		_mapper.Map(request.Attribute, attribute);
		await _dataContext.SaveChangesAsync(cancellationToken);

		return _mapper.Map<AttributeGetDto>(attribute).AsResponse();
	}
}
