using MediatR;
using Microsoft.AspNetCore.Mvc;
using TcgPocket.Features.Cards.Commands;
using TcgPocket.Features.Cards.Dtos;
using TcgPocket.Features.Cards.Queries;
using TcgPocket.Features.UserCards;
using TcgPocket.Shared;
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
        public async Task<ActionResult<Response<CardDetailDto>>> CreateCard([FromBody] CreateCardDto dto)
        {
            var response = await _mediator.Send(new CreateCardCommand { CreateCardDto = dto });

            return response.HasErrors
                ? BadRequest(response)
                : CreatedAtRoute(nameof(GetCardById), new { response.Data.Id }, response.Data);
        }

        [HttpPost("inventory")]
        public async Task<ActionResult<Response<List<UserCardDto>>>> AddCardsToInventory([FromBody] AddToInventoryDto dto)
        {
            var response = await _mediator.Send(new AddCardsToInventoryCommand { AddToInventoryDto = dto });

            return response.HasErrors ? BadRequest(response) : Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Response<CardGetDto>>> UpdateCard([FromRoute] int id, [FromBody] CardDto dto)
        {
            var response = await _mediator.Send(new UpdateCardCommand { Id = id, CardDto = dto });

            return response.HasErrors ? BadRequest(response) : Ok(response);
        }

        [HttpGet("{id}", Name = nameof(GetCardById))]
        public async Task<ActionResult<Response<CardDetailDto>>> GetCardById([FromRoute] int id)
        {
            var response = await _mediator.Send(new GetCardByIdQuery { Id = id });

            return response.HasErrors ? BadRequest(response) : Ok(response);
        }

        [HttpGet]
        public async Task<ActionResult<Response<PagedResult<CardDisplayDto>>>> 
            GetAllCardsPaginatedQuery([FromQuery] PagedCardFilterDto filter)
        {
            var response = await _mediator
                .Send(new GetPagedCardsQuery { Filter = filter });

            return response.HasErrors ? BadRequest(response) : Ok(response);
        }

        [HttpGet("inventory")]
        public async Task<ActionResult<Response<PagedResult<CardDisplayDto>>>>
            GetCurrentUserInventoryQuery([FromQuery] PagedCardFilterDto filter)
        {
            var response = await _mediator
                .Send(new GetCurrentUserInventoryQuery { Filter = filter });

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
