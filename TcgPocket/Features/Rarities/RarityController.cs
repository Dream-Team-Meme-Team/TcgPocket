using MediatR;
using Microsoft.AspNetCore.Mvc;
using TcgPocket.Features.Rarities.Commands;
using TcgPocket.Features.Rarities.Dtos.Requests;
using TcgPocket.Features.Rarities.Dtos.Responses;
using TcgPocket.Features.Rarities.Queries;
using TcgPocket.Shared;

namespace TcgPocket.Features.Rarities
{
    [ApiController]
    [Route("/rarities")]
    public class RarityController : ControllerBase
    {
        public readonly IMediator _mediator;

        public RarityController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult<Response<RarityResponseDto>>> CreateRarity([FromBody]CreateRarityDto dto) 
        {
            var rarity = await _mediator.Send(new CreateRarityCommand { CreateRarityDto = dto });

            return CreatedAtRoute(nameof(GetRarityById), new { id = rarity.Data.Id }, rarity.Data);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Response<RarityResponseDto>>> UpdateRarity([FromRoute]int id, [FromBody]UpdateRarityDto dto)
        {
            var rarity = await _mediator.Send(new UpdateRarityCommand { Id = id, UpdateRarityDto = dto });

            return Ok(rarity);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Response<RarityResponseDto>>> GetRarityById([FromRoute]int id)
        {
            var rarity = await _mediator.Send(new GetRarityByIdQuery { Id = id });

            return Ok(rarity);
        }

        [HttpGet]
        public async Task<ActionResult<Response<RarityResponseDto>>> GetAllRarities()
        {
            var rarities = await _mediator.Send(new GetAllRaritiesQuery { });

            return Ok(rarities);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Response<RarityResponseDto>>> DeleteRarity([FromRoute]int id)
        {
            var result = await _mediator.Send(new DeleteRarityCommand { Id = id });

            if (result.HasErrors)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
