using MediatR;
using Microsoft.AspNetCore.Mvc;
using TcgPocket.Features.Decks.Commands;
using TcgPocket.Features.Decks.Queries;
using TcgPocket.Shared;

namespace TcgPocket.Features.Decks;

[ApiController]
[Route("/api/user-decks")]
public class DecksController : ControllerBase
{
    private readonly IMediator _mediator;

    public DecksController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<Response<List<DeckGetDto>>>> GetAllDecksByUserId()
    {
        var response = await _mediator.Send(new GetAllDecksByCurrentUserQuery());

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }

    [HttpGet("{id:int}", Name = nameof(GetDeckById))]
    public async Task<ActionResult<Response<DeckGetDto>>> GetDeckById([FromRoute] int id)
    {
        var response = await _mediator.Send(new GetDeckByIdQuery { Id = id });

        return response.HasErrors ? NotFound(response) : Ok(response);
    }

    [HttpPost]
    public async Task<ActionResult<Response<DeckGetDto>>> CreateDeck([FromBody] CreateDeckDto data)
    {
        var response = await _mediator.Send(new CreateDeckCommand { Deck = data });

        return response.HasErrors
            ? BadRequest(response)
            : CreatedAtRoute(nameof(GetDeckById), new { response.Data.Id }, response);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<Response<DeckGetDto>>> UpdateDeck([FromRoute] int id,
        [FromBody] UpdateDeckDto data)
    {
        var response = await _mediator.Send(new UpdateDeckCommand { Id = id, Deck = data });

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<Response>> DeleteDeck([FromRoute] int id)
    {
        var response = await _mediator.Send(new DeleteDeckCommand { Id = id });

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
}