using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Shared;

namespace TcgPocket.Features.Users.Queries;

public class GetUserByIdQuery : IRequest<Response<UserGetDto>>
{
    public int Id { get; set; }
}

public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, Response<UserGetDto>>
{
    private readonly UserManager<User> _userManager;
    private readonly IValidator<GetUserByIdQuery> _validator;
    private readonly IMapper _mapper;

    public GetUserByIdQueryHandler(UserManager<User> userManager,
        IValidator<GetUserByIdQuery> validator,
        IMapper mapper)
    {
        _userManager = userManager;
        _validator = validator;
        _mapper = mapper;
    }

    public async Task<Response<UserGetDto>> Handle(GetUserByIdQuery query, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(query, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<UserGetDto> { Errors = errors };
        }

        var user = _userManager.Users
            .Include(x => x.UserRoles)
            .ThenInclude(x => x.Role)
            .SingleOrDefault(x => x.Id == query.Id);

        if (user is null) return Error.AsResponse<UserGetDto>("User not found", "id");

        return _mapper.Map<UserGetDto>(user).AsResponse();
    }
}