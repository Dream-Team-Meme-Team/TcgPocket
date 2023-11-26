using MediatR;
using Microsoft.AspNetCore.Mvc;
using TcgPocket.Features.Games.Commands;
using TcgPocket.Features.Games.Queries;
using TcgPocket.Shared;
using TcgPocket.Shared.Options;

namespace TcgPocket.Features.Games;

[ApiController]
[Route("/api/games")]
public class GamesController : ControllerBase
{
    private readonly IMediator _mediator;

    public GamesController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpGet]
    public async Task<ActionResult<Response<List<GameGetDto>>>> GetAllGames()
    {
        var response = await _mediator.Send(new GetAllGamesQuery());
        
        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
    
    [HttpGet("{id:int}", Name = nameof(GetGameById))]
    public async Task<ActionResult<Response<GameGetDto>>> GetGameById([FromRoute] int id)
    {
        var response = await _mediator.Send(new GetGameByIdQuery{Id = id});

        return response.HasErrors ? NotFound(response) : Ok(response);
    }

    [HttpPost]
    public async Task<ActionResult<Response<GameGetDto>>> CreateGame([FromBody] GameDto data)
    {
        var response = await _mediator.Send(new CreateGameCommand{Game = data});
        
        return response.HasErrors 
            ? BadRequest(response)
            : CreatedAtRoute(nameof(GetGameById), new { response.Data.Id }, response);
    }
    
    [HttpPut("{id:int}")]
    public async Task<ActionResult<Response<GameGetDto>>> UpdateGame( [FromRoute] int id,
        [FromBody] GameDto data)
    {
        var response = await _mediator.Send(new UpdateGameCommand{Id = id, Game = data});
        
        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
    
    [HttpDelete("{id:int}")]
    public async Task<ActionResult<Response>> DeleteGame([FromRoute] int id)
    {
        var response = await _mediator.Send(new DeleteGameCommand{Id = id});
        
        return response.HasErrors ? BadRequest(response) : Ok(response);
    }

    [HttpGet("options")]
    public async Task<ActionResult<Response<List<OptionItemDto>>>> GetOptions()
    {
        var response = await _mediator.Send(new GetGameOptionsRequest
        {
            MappingExpression = x => new OptionItemDto(x.Name, x.Id.ToString())
        });
        
        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
}