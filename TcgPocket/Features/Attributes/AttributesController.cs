using MediatR;
using Microsoft.AspNetCore.Mvc;
using TcgPocket.Features.Attributes.Commands;
using TcgPocket.Features.Attributes.Queries;
using TcgPocket.Shared;

namespace TcgPocket.Features.Attributes;

[ApiController]
[Route("/attributes")]
public class AttributesController : ControllerBase
{
	private readonly IMediator _mediator;

	public AttributesController(IMediator mediator)
	{
		_mediator = mediator;
	}

	[HttpGet]
	public async Task<ActionResult<Response<List<AttributeDto>>>> GetAllAttributes([FromQuery] GetAllAttributesRequest request)
	{
		var response = await _mediator.Send(request);

		return response.HasErrors ? BadRequest(response) : Ok(response);
	}

	[HttpGet("{id:int}")]
	public async Task<ActionResult<Response<AttributeGetDto>>> CreateAttribute([FromBody] AttributeDto data)
	{
		var response = await _mediator.Send(new GetAttributeByIdRequest{Id = id});

		return response.HasErrors ? BadRequest(response) : Ok(response);
	}

	[HttpPost]
	public async Task<ActionResult<Response<AttributeGetDto>>> CreateAttribute([FromBody] AttributeDto data)
	{
		var response = await _mediator.Send(new CreateAttributeRequest{Attribute = data});

		return response.HasErrors ? BadRequest(response) : Ok(response);
	}

	[HttpPut("{id:int}")]
	public async Task<ActionResult<Response<AttributeGetDto>>> UpdateAttribute([FromRoute] int id,
		[FromBody] AttributeDto data)
	{
		var response = await _mediator.Send(new UpdateAttributeRequest{Id = id, Attribute = data});

		return response.HasErrors ? BadRequest(response) : Ok(response);
	}

	[HttpDelete("{id:int}")]
	public async Task<ActionResult<Response>> DeleteAttribute([FromRoute] int id)
	{
		var response = await _mediator.Send(new DeleteAttributeRequest{Id = id});

		return response.HasErrors ? BadRequest(response) : Ok(response);
	}
}
