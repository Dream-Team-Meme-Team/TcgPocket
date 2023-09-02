using MediatR;
using Microsoft.AspNetCore.Mvc;
using TcgPocket.Features.Games.Commands;
using TcgPocket.Features.Games.Queries;
using TcgPocket.Shared;

namespace TcgPocket.Features.Games;

[ApiController]
[Route("/games")]
public class GamesController : ControllerBase
{
    private readonly IMediator _mediator;

    public GamesController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpGet]
    public async Task<ActionResult<Response<List<GameDto>>>> GetAllGames([FromQuery] GetAllGamesRequest request)
    {
        var response = await _mediator.Send(request);
        
        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
    
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Response<GameDto>>> GetGameById([FromRoute] int id)
    {
        var response = await _mediator.Send(new GetGameByIdRequest{Id = id});

        return response.HasErrors ? NotFound(response) : Ok(response);
    }
    
    [HttpPost]
    public async Task<ActionResult<Response<GameGetDto>>> CreateGame([FromBody] GameDto data)
    {
        var response = await _mediator.Send(new CreateGameRequest{Game = data});
        
        return response.HasErrors ? BadRequest(response) : CreatedAtRoute(nameof(CreateGameRequest), response);
    }
    
    [HttpPut("{id:int}")]
    public async Task<ActionResult<Response<GameGetDto>>> UpdateGame( [FromRoute] int id,
        [FromBody] GameDto data)
    {
        var response = await _mediator.Send(new UpdateGameRequest{Id = id, Game = data});
        
        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
    
    [HttpDelete("{id:int}")]
    public async Task<ActionResult<Response>> DeleteGame([FromRoute] int id)
    {
        var response = await _mediator.Send(new DeleteGameRequest{Id = id});
        
        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
}