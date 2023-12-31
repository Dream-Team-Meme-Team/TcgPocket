﻿using MediatR;
using Microsoft.AspNetCore.Mvc;
using TcgPocket.Features.Roles.Commands;
using TcgPocket.Features.Roles.Queries;
using TcgPocket.Features.Users;
using TcgPocket.Features.Users.Queries;
using TcgPocket.Shared;

namespace TcgPocket.Features.Roles;

[ApiController]
[Route("/api/roles")]
public class RolesController : ControllerBase
{
    private readonly IMediator _mediator;

    public RolesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<Response<List<RoleGetDto>>>> GetAllRoles()
    {
        var response = await _mediator.Send(new GetAllRolesQuery());

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }

    [HttpGet("{id:int}", Name = nameof(GetRoleById))]
    public async Task<ActionResult<Response<RoleGetDto>>> GetRoleById([FromRoute] int id)
    {
        var response = await _mediator.Send(new GetRoleByIdQuery { Id = id });

        return response.HasErrors ? NotFound(response) : Ok(response);
    }

    [HttpGet("users/{id:int}", Name = nameof(GetAllUsersByRoleId))]
    public async Task<ActionResult<Response<UserGetDto>>> GetAllUsersByRoleId([FromRoute] int id)
    {
        var response = await _mediator.Send(new GetAllUsersByRoleIdQuery { Id = id });

        return response.HasErrors ? NotFound(response) : Ok(response);
    }

    [HttpPost]
    public async Task<ActionResult<Response<RoleGetDto>>> CreateRole([FromBody] RoleDto data)
    {
        var response = await _mediator.Send(new CreateRoleCommand { Role = data });

        return response.HasErrors
            ? BadRequest(response)
            : CreatedAtRoute(nameof(GetRoleById), new { response.Data.Id }, response);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<Response<RoleGetDto>>> UpdateRole([FromRoute] int id,
        [FromBody] RoleDto data)
    {
        var response = await _mediator.Send(new UpdateRoleCommand { Id = id, Role = data });

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<Response>> DeleteRole([FromRoute] int id)
    {
        var response = await _mediator.Send(new DeleteRoleCommand { Id = id });

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
}