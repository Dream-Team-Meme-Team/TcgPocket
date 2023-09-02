using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Attributes.Commands;

public class DeleteAttributeRequest : IRequest<Response>
{
	public int Id { get; set; }
}

public class DeleteAttributeRequestHandler : IRequestHandler<DeleteAttributeRequest, Response>
{
	private readonly DataContext _dataContext;

	public DeleteAttributeRequestHandler(DataContext dataContext)
	{
		_dataContext = dataContext;
	}

	public async Task<Response> Handle(DeleteAttributeRequest request, CancellationToken cancellationToken)
	{
		var attribute = await _dataContext.Set<Attribute>()
			.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

		if (attribute is null) return Error.AsResponse("Attribute not found", "id");

		_dataContext.Set<Attribute>().Remove(attribute);
		await _dataContext.SaveChangesAsync(cancellationToken);

		return Response.Success;
	}
}
