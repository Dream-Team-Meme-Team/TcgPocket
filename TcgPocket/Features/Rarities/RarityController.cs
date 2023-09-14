using MediatR;
using Microsoft.AspNetCore.Mvc;
using TcgPocket.Features.Rarities.Commands;
using TcgPocket.Features.Rarities.Queries;
using TcgPocket.Shared;

namespace TcgPocket.Features.Rarities
{
    [ApiController]
    [Route("/api/rarities")]
    public class RarityController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RarityController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult<Response<RarityGetDto>>> CreateRarity([FromBody] RarityDto dto) 
        {
            var response = await _mediator.Send(new CreateRarityCommand { RarityDto = dto });

            return response.HasErrors 
                ? BadRequest(response) 
                : CreatedAtRoute(nameof(GetRarityById), new { response.Data.Id }, response.Data);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Response<RarityGetDto>>> UpdateRarity([FromRoute]int id, [FromBody] RarityDto dto)
        {
            var response = await _mediator.Send(new UpdateRarityCommand { Id = id, RarityDto = dto });

            return response.HasErrors ? BadRequest(response) : Ok(response);
        }

        [HttpGet("{id}", Name = nameof(GetRarityById))]
        public async Task<ActionResult<Response<RarityGetDto>>> GetRarityById([FromRoute]int id)
        {
            var response = await _mediator.Send(new GetRarityByIdQuery { Id = id });

            return response.HasErrors ? BadRequest(response) : Ok(response);
        }

        [HttpGet]
        public async Task<ActionResult<Response<List<RarityGetDto>>>> GetAllRarities()
        {
            var response = await _mediator.Send(new GetAllRaritiesQuery { });

            return response.HasErrors ? BadRequest(response) : Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Response>> DeleteRarity([FromRoute]int id)
        {
            var response = await _mediator.Send(new DeleteRarityCommand { Id = id });

            return response.HasErrors ? BadRequest(response) : Ok(response);
        }
    }
}
