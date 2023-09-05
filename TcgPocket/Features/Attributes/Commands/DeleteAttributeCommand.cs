using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Attributes.Commands;

public class DeleteAttributeCommand : IRequest<Response>
{
	public int Id { get; set; }
}

public class DeleteAttributeCommandHandler : IRequestHandler<DeleteAttributeCommand, Response>
{
	private readonly DataContext _dataContext;
	private readonly IValidator<DeleteAttributeCommand> _validator;
	private readonly IMapper _mapper;

	public DeleteAttributeCommandHandler(DataContext dataContext,
		IValidator<DeleteAttributeCommand> validator,
		IMapper mapper)
	{
		_dataContext = dataContext;
		_validator = validator;
		_mapper = mapper;
	}

	public async Task<Response> Handle(DeleteAttributeCommand command, CancellationToken cancellationToken)
	{
		var validationResult = await _validator.ValidateAsync(command, cancellationToken);

		if (!validationResult.IsValid)
		{
			var errors = _mapper.Map<List<Error>>(validationResult.Errors);
			return new Response{Errors = errors};
		}

		var attribute = await _dataContext.Set<Attribute>()
			.FirstOrDefaultAsync(x => x.Id == command.Id, cancellationToken);

		if (attribute is null) return Error.AsResponse("Attribute not found", "id");

		_dataContext.Set<Attribute>().Remove(attribute);
		await _dataContext.SaveChangesAsync(cancellationToken);

		return Response.Success;
	}
}
