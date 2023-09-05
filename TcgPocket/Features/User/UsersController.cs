using MediatR;
using Microsoft.AspNetCore.Mvc;
using TcgPocket.Features.Users.Commands;
using TcgPocket.Features.Users.Queries;
using TcgPocket.Shared;

namespace TcgPocket.Features.Users;

[ApiController]
[Route("/sets")]
public class UsersController : ControllerBase
{
    private readonly IMediator _mediator;

    public UsersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<Response<List<UserDto>>>> GetAllUsers()
    {
        var response = await _mediator.Send(new GetAllUsersQuery());

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }

    [HttpGet("{id:int}", Name = nameof(GetUserById))]
    public async Task<ActionResult<Response<UserGetDto>>> GetUserById([FromRoute] int id)
    {
        var response = await _mediator.Send(new GetUserByIdQuery { Id = id });

        return response.HasErrors ? NotFound(response) : Ok(response);
    }

    [HttpPost]
    public async Task<ActionResult<Response<UserGetDto>>> CreateUser([FromBody] UserDto data)
    {
        var response = await _mediator.Send(new CreateUserCommand { User = data });

        return response.HasErrors
            ? BadRequest(response)
            : CreatedAtRoute(nameof(GetUserById), new { response.Data.Id }, response);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<Response<UserGetDto>>> UpdateUser([FromRoute] int id,
        [FromBody] UserDto data)
    {
        var response = await _mediator.Send(new UpdateUserCommand { Id = id, User = data });

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<Response>> DeleteUser([FromRoute] int id)
    {
        var response = await _mediator.Send(new DeleteUserCommand { Id = id });

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
}