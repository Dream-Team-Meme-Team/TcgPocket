using MediatR;
using Microsoft.AspNetCore.Mvc;
using TcgPocket.Shared;

namespace TcgPocket.Features.CardReader;

[Tags("AAAAA")]
[ApiController]
[Route("/api/card-reader")]
public class CardReaderController : ControllerBase
{
    private readonly IMediator _mediator;

    public CardReaderController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<Response<object>>> GetAllAttributes()
    {
        var response = await _mediator.Send(new ReadCardRequest());

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
}