using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using TcgPocket.Data;
using TcgPocket.Features.Users.Dtos;
using TcgPocket.Shared;

namespace TcgPocket.Features.Users.Commands;

public class CreateUserCommand : IRequest<Response<UserGetDto>>
{
    public UserCreateDto User { get; set; }
}

public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, Response<UserGetDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<CreateUserCommand> _validator;
    private readonly UserManager<User> _userManager;

    public CreateUserCommandHandler(DataContext dataContext,
        IValidator<CreateUserCommand> validator,
        UserManager<User> userManager,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
        _userManager = userManager;
    }

    public async Task<Response<UserGetDto>> Handle(CreateUserCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<UserGetDto> { Errors = errors };
        }

        var user = _mapper.Map<User>(command.User);

        var result = await _userManager.CreateAsync(user, command.User.Password);

        if (!result.Succeeded)
        {
            var errors = _mapper.Map<List<Error>>(result.Errors);
            return new Response<UserGetDto>{Errors = errors};
        }

        result = await _userManager.AddToRoleAsync(user, "Basic");

        if (!result.Succeeded)
        {
            var errors = _mapper.Map<List<Error>>(result.Errors);
            return new Response<UserGetDto> { Errors = errors };
        }

        await _dataContext.SaveChangesAsync(cancellationToken);

        var returnedUser = _userManager.Users.SingleOrDefault(x => x.Id == user.Id);

        if (returnedUser is null)
        {
            return Error.AsResponse<UserGetDto>("Something went wrong.", "user");
        }

        return _mapper.Map<UserGetDto>(returnedUser).AsResponse();
    }
}