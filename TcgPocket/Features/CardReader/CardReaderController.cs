using MediatR;
using Microsoft.AspNetCore.Mvc;

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
    [RequestFormLimits(
        ValueLengthLimit = int.MaxValue,
        MultipartBodyLengthLimit = int.MaxValue,
        MultipartHeadersLengthLimit = int.MaxValue)]
    [RequestSizeLimit(int.MaxValue)]
    public async Task<ActionResult<string>> ReadCard(IFormFile data)
    {
        var response = await _mediator.Send(new ReadCardRequest{ Image = data});

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
}