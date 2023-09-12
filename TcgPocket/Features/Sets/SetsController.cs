using MediatR;
using Microsoft.AspNetCore.Mvc;
using TcgPocket.Features.Sets.Commands;
using TcgPocket.Features.Sets.Queries;
using TcgPocket.Shared;

namespace TcgPocket.Features.Sets;

[ApiController]
[Route("/api/sets")]
public class SetsController : ControllerBase
{
    private readonly IMediator _mediator;

    public SetsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<Response<List<SetDto>>>> GetAllSets()
    {
        var response = await _mediator.Send(new GetAllSetsQuery());

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }

    [HttpGet("{id:int}", Name = nameof(GetSetById))]
    public async Task<ActionResult<Response<SetGetDto>>> GetSetById([FromRoute] int id)
    {
        var response = await _mediator.Send(new GetSetByIdQuery { Id = id });

        return response.HasErrors ? NotFound(response) : Ok(response);
    }

    [HttpPost]
    public async Task<ActionResult<Response<SetGetDto>>> CreateSet([FromBody] SetDto data)
    {
        var response = await _mediator.Send(new CreateSetCommand { Set = data });

        return response.HasErrors
            ? BadRequest(response)
            : CreatedAtRoute(nameof(GetSetById), new { response.Data.Id }, response);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<Response<SetGetDto>>> UpdateSet([FromRoute] int id,
        [FromBody] SetDto data)
    {
        var response = await _mediator.Send(new UpdateSetCommand { Id = id, Set = data });

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<Response>> DeleteSet([FromRoute] int id)
    {
        var response = await _mediator.Send(new DeleteSetCommand { Id = id });

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
}