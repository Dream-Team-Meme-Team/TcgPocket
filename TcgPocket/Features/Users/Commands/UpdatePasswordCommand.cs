using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using TcgPocket.Features.Users.Dtos;
using TcgPocket.Shared;

namespace TcgPocket.Features.Users.Commands;

public class UpdatePasswordCommand : IRequest<Response>
{
    public UserPasswordUpdateDto PasswordUpdateDto { get; set; }
}

public class UpdatePasswordCommandHandler : IRequestHandler<UpdatePasswordCommand, Response>
{
    private readonly IMapper _mapper;
    private readonly IValidator<UpdatePasswordCommand> _validator;
    private readonly UserManager<User> _userManager;

    public UpdatePasswordCommandHandler(IValidator<UpdatePasswordCommand> validator, UserManager<User> userManager, IMapper mapper)
    {
        _mapper = mapper;
        _validator = validator;
        _userManager = userManager;
    }

    public async Task<Response> Handle(UpdatePasswordCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response { Errors = errors };
        }

        var user = _userManager.Users.FirstOrDefault(x => x.UserName == command.PasswordUpdateDto.UserName);

        if (user is null)
        {
            return Error.AsResponse("Username or password is incorrect.");
        }

        var correctPassword = await _userManager.CheckPasswordAsync(user, command.PasswordUpdateDto.CurrentPassword);

        if (!correctPassword)
        {
            return Error.AsResponse("Username or password is incorrect.");
        }

        var result = await _userManager.ChangePasswordAsync(user, command.PasswordUpdateDto.CurrentPassword, command.PasswordUpdateDto.NewPassword);

        if (!result.Succeeded)
        {
            var errors = _mapper.Map<List<Error>>(result.Errors);
            return new Response { Errors = errors };
        }

        return Response.Success;
    }
}