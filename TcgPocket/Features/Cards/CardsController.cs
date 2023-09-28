using MediatR;
using Microsoft.AspNetCore.Mvc;
using TcgPocket.Features.Cards.Commands;
using TcgPocket.Features.Cards.Queries;
using TcgPocket.Shared;
using TcgPocket.Shared.Dtos;
using TcgPocket.Shared.PagedResult;

namespace TcgPocket.Features.Cards
{
    [ApiController]
    [Route("/api/cards")]
    public class CardsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CardsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult<Response<CardGetDto>>> CreateCard([FromBody] CardDto dto)
        {
            var response = await _mediator.Send(new CreateCardCommand { CardDto = dto });

            return response.HasErrors
                ? BadRequest(response)
                : CreatedAtRoute(nameof(GetCardById), new { response.Data.Id }, response.Data);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Response<CardGetDto>>> UpdateCard([FromRoute] int id, [FromBody] CardDto dto)
        {
            var response = await _mediator.Send(new UpdateCardCommand { Id = id, CardDto = dto });

            return response.HasErrors ? BadRequest(response) : Ok(response);
        }

        [HttpGet("{id}", Name = nameof(GetCardById))]
        public async Task<ActionResult<Response<CardGetDto>>> GetCardById([FromRoute] int id)
        {
            var response = await _mediator.Send(new GetCardByIdQuery { Id = id });

            return response.HasErrors ? BadRequest(response) : Ok(response);
        }

        [HttpGet]
        public async Task<ActionResult<Response<PagedResult<CardGetDto>>>> GetAllCardsPaginatedQuery([FromQuery]PageDto data)
        {
            var response = await _mediator
                .Send(new GetAllCardsPaginatedQuery { PageDto = data });

            return response.HasErrors ? BadRequest(response) : Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Response>> DeleteCard([FromRoute] int id)
        {
            var response = await _mediator.Send(new DeleteCardCommand { Id = id });

            return response.HasErrors ? BadRequest(response) : Ok(response);
        }
    }
}
