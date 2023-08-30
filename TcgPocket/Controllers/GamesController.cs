using MediatR;
using Microsoft.AspNetCore.Mvc;
using TcgPocket.Common;
using TcgPocket.Features.Games;

namespace TcgPocket.Controllers;

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
    public async Task<Response<List<GameDto>>> GetAllGames([FromQuery] GetAllGamesQuery query)
    {
        return await _mediator.Send(query);
    }
    
    [HttpGet("{id:int}")]
    public async Task<Response<GameDto>> GetGameById([FromRoute] int id)
    {
        return await _mediator.Send(new GetGameByIdQuery{Id = id});
    }
    
    [HttpPost]
    public async Task<Response<GameGetDto>> CreateGame([FromBody] CreateGameCommand command)
    {
        return await _mediator.Send(command);
    }
    
    [HttpPut("{id:int}")]
    public async Task<Response<GameGetDto>> UpdateGame( [FromRoute] int id,
        [FromBody] UpdateGameCommand command)
    {
        command.Id = id;
        return await _mediator.Send(command);
    }
    
    [HttpDelete("{id:int}")]
    public async Task<Response> DeleteGame([FromRoute] int id)
    {
        return await _mediator.Send(new DeleteGameCommand{Id = id});
    }
}