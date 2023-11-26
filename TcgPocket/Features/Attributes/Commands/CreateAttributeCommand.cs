using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Features.Games;
using TcgPocket.Shared;

namespace TcgPocket.Features.Attributes.Commands;

public class CreateAttributeCommand : IRequest<Response<AttributeGetDto>>
{
	public AttributeDto Attribute { get; set; }
}

public class CreateAttributeCommandHandler : IRequestHandler<CreateAttributeCommand, Response<AttributeGetDto>>
{
	private readonly DataContext _dataContext;
	private readonly IMapper _mapper;
	private readonly IValidator<CreateAttributeCommand> _validator;

	public CreateAttributeCommandHandler(DataContext dataContext,
		IValidator<CreateAttributeCommand> validator,
		IMapper mapper)
	{
		_dataContext = dataContext;
		_mapper = mapper;
		_validator = validator;
	}

	public async Task<Response<AttributeGetDto>> Handle(CreateAttributeCommand request, CancellationToken cancellationToken)
	{
		var validationResult = await _validator.ValidateAsync(request, cancellationToken);

		if (!validationResult.IsValid)
		{
			var errors = _mapper.Map<List<Error>>(validationResult.Errors);
			return new Response<AttributeGetDto>{Errors = errors};
		}

		if (!await _dataContext.Set<Game>().AnyAsync(x => x.Id == request.Attribute.GameId, cancellationToken))
		{
			return Error.AsResponse<AttributeGetDto>("Game not found", "gameId");
		}

		var attribute = _mapper.Map<Attribute>(request.Attribute);
		await _dataContext.Set<Attribute>().AddAsync(attribute, cancellationToken);
		await _dataContext.SaveChangesAsync(cancellationToken);

		return _mapper.Map<AttributeGetDto>(attribute).AsResponse();
	}
}
