using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TcgPocket.Features.Roles.Commands;
using TcgPocket.Features.Roles.Queries;
using TcgPocket.Shared;

namespace TcgPocket.Features.Roles;

[ApiController]
[Route("/roles")]
public class RolesController : ControllerBase
{
    private readonly IMediator _mediator;

    public RolesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<Response<List<IdentityRole<int>>>>> GetAllRoles()
    {
        var response = await _mediator.Send(new GetAllRolesQuery());

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }

    //[HttpGet("{id:int}", Name = nameof(GetRoleById))]
    //public async Task<ActionResult<Response<IdentityRole<int>>>> GetRoleById([FromRoute] int id)
    //{
    //    var response = await _mediator.Send(new GetRoleByIdQuery { Id = id });

    //    return response.HasErrors ? NotFound(response) : Ok(response);
    //}

    [HttpPost]
    public async Task<ActionResult<Response<IdentityRole<int>>>> CreateRole([FromBody] CreateRoleCommand data)
    {
        var response = await _mediator.Send(new CreateRoleCommand { RoleName = data.RoleName });

        return response.HasErrors ? NotFound(response) : Ok(response);
    }

    //[HttpPut("{id:int}")]
    //public async Task<ActionResult<Response<IdentityRole<int>>>> UpdateRole([FromRoute] int id,
    //    [FromBody] RoleDto data)
    //{
    //    var response = await _mediator.Send(new UpdateRoleCommand { Id = id, Role = data });

    //    return response.HasErrors ? BadRequest(response) : Ok(response);
    //}

    //[HttpPut("{id:int}/password-update", Name = nameof(UpdatePassword))]
    //public async Task<ActionResult<Response<IdentityRole<int>>>> UpdatePassword([FromRoute] int id,
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
    //public async Task<ActionResult<Response>> DeleteRole([FromRoute] int id)
    //{
    //    var response = await _mediator.Send(new DeleteRoleCommand { Id = id });

    //    return response.HasErrors ? BadRequest(response) : Ok(response);
    //}
}