using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Users.Commands;

public class UpdateUserCommand : IRequest<Response<UserGetDto>>
{
    public int Id { get; set; }
    public UserDto User { get; set; }
}

public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, Response<UserGetDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<UpdateUserCommand> _validator;
    private readonly UserManager<User> _userManager;

    public UpdateUserCommandHandler(DataContext dataContext,
        IValidator<UpdateUserCommand> validator,
        UserManager<User> userManager,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
        _userManager = userManager;
    }

    public async Task<Response<UserGetDto>> Handle(UpdateUserCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<UserGetDto> { Errors = errors };
        }

        var user = _userManager.Users.SingleOrDefault(x => x.Id == command.Id);

        if (user is null)
        {
            return Error.AsResponse<UserGetDto>("User not found", "userId");
        }

        _mapper.Map(command.User, user);
        var result = await _userManager.UpdateAsync(user);

        if (!result.Succeeded)
        {
            var errors = _mapper.Map<List<Error>>(result.Errors);
            return new Response<UserGetDto>{Errors = errors};
        }

        await _dataContext.SaveChangesAsync(cancellationToken);

        return _mapper.Map<UserGetDto>(user).AsResponse();
    }
}