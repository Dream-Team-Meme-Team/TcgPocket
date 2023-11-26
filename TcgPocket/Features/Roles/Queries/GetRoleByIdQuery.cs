using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using TcgPocket.Shared;

namespace TcgPocket.Features.Roles.Queries;

public class GetRoleByIdQuery : IRequest<Response<RoleGetDto>>
{
    public int Id { get; set; }
}

public class GetRoleByIdQueryHandler : IRequestHandler<GetRoleByIdQuery, Response<RoleGetDto>>
{
    private readonly RoleManager<Role> _roleManager;
    private readonly IValidator<GetRoleByIdQuery> _validator;
    private readonly IMapper _mapper;

    public GetRoleByIdQueryHandler(RoleManager<Role> roleManager,
        IValidator<GetRoleByIdQuery> validator,
        IMapper mapper)
    {
        _roleManager = roleManager;
        _validator = validator;
        _mapper = mapper;
    }

    public async Task<Response<RoleGetDto>> Handle(GetRoleByIdQuery query, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(query, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<RoleGetDto> { Errors = errors };
        }

        var role = _roleManager.Roles.SingleOrDefault(x => x.Id == query.Id);

        if (role is null) return Error.AsResponse<RoleGetDto>("Role not found", "id");

        return _mapper.Map<RoleGetDto>(role).AsResponse();
    }
}