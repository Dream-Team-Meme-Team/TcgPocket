using MediatR;
using Microsoft.AspNetCore.Mvc;
using TcgPocket.Features.UserRoles.Commands;
using TcgPocket.Shared;

namespace TcgPocket.Features.UserRoles;

[ApiController]
[Route("/user-roles")]
public class UserRolesController : ControllerBase
{
    private readonly IMediator _mediator;

    public UserRolesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    //[HttpGet]
    //public async Task<ActionResult<Response<List<IdentityUserRole<int>>>>> GetAllUserRoles()
    //{
    //    var response = await _mediator.Send(new GetAllUserRolesQuery());

    //    return response.HasErrors ? BadRequest(response) : Ok(response);
    //}

    //[HttpGet("{id:int}", Name = nameof(GetUserRoleById))]
    //public async Task<ActionResult<Response<IdentityUserRole<int>>>> GetUserRoleById([FromRoute] int id)
    //{
    //    var response = await _mediator.Send(new GetUserRoleByIdQuery { Id = id });

    //    return response.HasErrors ? NotFound(response) : Ok(response);
    //}

    [HttpPost]
    public async Task<ActionResult<Response>> CreateUserRole([FromBody] CreateUserRoleCommand data)
    {
        var response = await _mediator.Send(new CreateUserRoleCommand { UserId = data.UserId, RoleId = data.RoleId });

        return response.HasErrors ? NotFound(response) : Ok(response);
    }

    //[HttpPut("{id:int}")]
    //public async Task<ActionResult<Response<IdentityUserRole<int>>>> UpdateUserRole([FromRoute] int id,
    //    [FromBody] UserRoleDto data)
    //{
    //    var response = await _mediator.Send(new UpdateUserRoleCommand { Id = id, UserRole = data });

    //    return response.HasErrors ? BadRequest(response) : Ok(response);
    //}

    //[HttpPut("{id:int}/password-update", Name = nameof(UpdatePassword))]
    //public async Task<ActionResult<Response<IdentityUserRole<int>>>> UpdatePassword([FromRoute] int id,
    //    [FromBody] UpdatePasswordCommand data)
    //{
    //    var response = await _mediator
    //        .Send(new UpdatePasswordCommand
    //        {
    //            Id = id,
    //            CurrentPassword = data.CurrentPassword,
    //            NewPassword = data.NewPassword,
    //            NewPasswordConfirmation = data.NewPasswordConfirmation
    //        });

    //    return response.HasErrors ? BadRequest(response) : Ok(response);
    //}

    //[HttpDelete("{id:int}")]
    //public async Task<ActionResult<Response>> DeleteUserRole([FromRoute] int id)
    //{
    //    var response = await _mediator.Send(new DeleteUserRoleCommand { Id = id });

    //    return response.HasErrors ? BadRequest(response) : Ok(response);
    //}
}