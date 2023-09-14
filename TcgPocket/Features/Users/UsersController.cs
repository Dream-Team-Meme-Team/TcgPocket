using MediatR;
using Microsoft.AspNetCore.Mvc;
using TcgPocket.Features.Roles;
using TcgPocket.Features.Users.Commands;
using TcgPocket.Features.Users.Dtos;
using TcgPocket.Features.Users.Queries;
using TcgPocket.Shared;

namespace TcgPocket.Features.Users;

[ApiController]
[Route("/api/users")]
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

    [HttpGet("roles/{id:int}", Name = nameof(GetAllRolesByUserId))]
    public async Task<ActionResult<Response<List<RoleGetDto>>>> GetAllRolesByUserId([FromRoute] int id)
    {
        var response = await _mediator.Send(new GetAllRolesByUserIdQuery { UserId = id });

        return response.HasErrors ? NotFound(response) : Ok(response);
    }

    [HttpPost]
    public async Task<ActionResult<Response<UserGetDto>>> CreateUser([FromBody] UserCreateDto data)
    {
        var response = await _mediator.Send(new CreateUserCommand { User = data });

        return response.HasErrors
            ? BadRequest(response)
            : CreatedAtRoute(nameof(GetUserById), new { response.Data.Id }, response);
    }

    [HttpPost("roles/{id:int}")]
    public async Task<ActionResult<Response<UserRoleDto>>> AddRoleToUser([FromRoute] int id, [FromBody] RoleDto data)
    {
        var response = await _mediator.Send(new AddRoleToUserCommand { Id = id, Role = data });

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

    [HttpPut("password-update", Name = nameof(UpdatePassword))]
    public async Task<ActionResult<Response<UserGetDto>>> UpdatePassword(
        [FromBody] UserPasswordUpdateDto data)
    {
        var response = await _mediator.Send(new UpdatePasswordCommand { PasswordUpdateDto = data });

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<Response>> DeleteUser([FromRoute] int id)
    {
        var response = await _mediator.Send(new DeleteUserCommand { Id = id });

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }

    [HttpDelete("role/{id:int}")]
    public async Task<ActionResult<Response>> RemoveRoleFromUser([FromRoute] int id, [FromBody] RoleDto data )
    {
        var response = await _mediator.Send(new RemoveRoleFromUserCommand { UserId = id, Role = data });

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }

    [HttpPost("sign-in")]
    public async Task<ActionResult<Response<UserGetDto>>> SignInUser(SignInUserDto data)
    {
        var response = await _mediator.Send(new SignInUserCommand {Data = data});
        
        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
    
    [HttpPost("sign-out")]
    public async Task<ActionResult<Response>> SignInUser()
    {
        var response = await _mediator.Send(new SignOutUserCommand());
        
        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
    
    [HttpGet("signed-in-user")]
    public async Task<ActionResult<Response<List<UserDto>>>> GetSignedInUser()
    {
        var response = await _mediator.Send(new GetSignedInUserQuery());

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
}