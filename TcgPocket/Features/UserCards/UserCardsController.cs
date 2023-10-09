using MediatR;
using Microsoft.AspNetCore.Mvc;
using TcgPocket.Features.UserCards.Commands;
using TcgPocket.Features.UserCards.Queries;
using TcgPocket.Shared;

namespace TcgPocket.Features.UserCards;

[ApiController]
[Route("/api/user-cards")]
public class UserCardsController : ControllerBase
{
    private readonly IMediator _mediator;

    public UserCardsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<Response<List<UserCardGetDto>>>> GetAllUserCards()
    {
        var response = await _mediator.Send(new GetAllUserCardsQuery());

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }

    [HttpGet("{id:int}", Name = nameof(GetUserCardById))]
    public async Task<ActionResult<Response<UserCardGetDto>>> GetUserCardById([FromRoute] int id)
    {
        var response = await _mediator.Send(new GetUserCardByIdQuery { Id = id });

        return response.HasErrors ? NotFound(response) : Ok(response);
    }

    [HttpPost]
    public async Task<ActionResult<Response<UserCardGetDto>>> CreateUserCard([FromBody] UserCardDto data)
    {
        var response = await _mediator.Send(new CreateUserCardCommand { UserCard = data });

        return response.HasErrors
            ? BadRequest(response)
            : CreatedAtRoute(nameof(GetUserCardById), new { response.Data.Id }, response);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<Response<UserCardGetDto>>> UpdateUserCard([FromRoute] int id,
        [FromBody] UserCardDto data)
    {
        var response = await _mediator.Send(new UpdateUserCardCommand { Id = id, UserCard = data });

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<Response>> DeleteUserCard([FromRoute] int id)
    {
        var response = await _mediator.Send(new DeleteUserCardCommand { Id = id });

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
}