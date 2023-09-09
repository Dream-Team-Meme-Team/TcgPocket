using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;
using TcgPocket.Shared;

namespace TcgPocket.Features.Users.Commands;

public class UpdatePasswordCommand : IRequest<Response>
{
    [JsonIgnore]
    public string UserName { get; set; }
    public string CurrentPassword { get; set; }
    public string NewPassword { get; set; }
    public string NewPasswordConfirmation { get; set; }
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

        var user = _userManager.Users.FirstOrDefault(x => x.UserName.Equals(command.UserName));

        if (user is null)
        {
            return Error.AsResponse("Something went wrong.");
        }

        var correctPassword = await _userManager.CheckPasswordAsync(user, command.CurrentPassword);

        if (!correctPassword)
        {
            return Error.AsResponse("Something went wrong.");
        }

        var result = await _userManager.ChangePasswordAsync(user, command.CurrentPassword, command.NewPassword);

        if (!result.Succeeded)
        {
            var errors = _mapper.Map<List<Error>>(result.Errors);
            return new Response { Errors = errors };
        }

        return Response.Success;
    }
}