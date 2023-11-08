using MediatR;
using Microsoft.AspNetCore.Mvc;
using TcgPocket.Features.UserCards;
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

    [HttpPost]
    public async Task<ActionResult<Response<UserCardGetDto>>> ReadCard(IFormFile data)
    {
        var response = await _mediator.Send(new ReadCardRequest{ Image = data});

        return response.HasErrors
            ? BadRequest(response)
            : Created(nameof(ReadCard), response);
    }
}