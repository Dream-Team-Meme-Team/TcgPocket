using MediatR;
using Microsoft.AspNetCore.Mvc;
using TcgPocket.Features.CardTypes.Queries;
using TcgPocket.Features.Rarities.Commands;
using TcgPocket.Features.Rarities.Dtos;
using TcgPocket.Features.Rarities.Queries;
using TcgPocket.Shared;
using TcgPocket.Shared.Options;
using TcgPocket.Shared.PagedResult;

namespace TcgPocket.Features.Rarities;

[ApiController]
[Route("/api/rarities")]
public class RarityController : ControllerBase
{
    private readonly IMediator _mediator;

    public RarityController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<Response<List<RarityGetDto>>>> GetAllRarities()
    {
        var response = await _mediator.Send(new GetAllRaritiesQuery { });

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }

    [HttpGet("{id}", Name = nameof(GetRarityById))]
    public async Task<ActionResult<Response<RarityGetDto>>> GetRarityById([FromRoute]int id)
    {
        var response = await _mediator.Send(new GetRarityByIdQuery { Id = id });

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }

    [HttpGet("paginated")]
    public async Task<ActionResult<Response<PagedResult<RarityGetDto>>>>
       GetAllRaritiesPaginatedQuery([FromQuery] PagedRarityFilterDto filter)
    {
        var response = await _mediator
            .Send(new GetPagedRaritiesQuery { Filter = filter });

        return response.HasErrors ? BadRequest(response) : Ok(response);
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

    [HttpDelete("{id}")]
    public async Task<ActionResult<Response>> DeleteRarity([FromRoute]int id)
    {
        var response = await _mediator.Send(new DeleteRarityCommand { Id = id });

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
    
    [HttpGet("options")]
    public async Task<ActionResult<Response<List<OptionItemDto>>>> GetOptions()
    {
        var response = await _mediator.Send(new GetRarityOptionsRequest
        {
            MappingExpression = x => new OptionItemDto(x.Name, x.Id.ToString())
        });
    
        return response.HasErrors ? BadRequest(response) : Ok(response);
    }

    [HttpGet("options/{gameId}")]
    public async Task<ActionResult<Response<List<OptionItemDto>>>> GetOptionsByGameId(int gameId)
    {
        var response = await _mediator.Send(new GetRarityOptionsRequest
        {
            MappingExpression = x => new OptionItemDto(x.Name, x.Id.ToString()),
            FilterExpression = x => x.GameId == gameId
        });
    
        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
}
