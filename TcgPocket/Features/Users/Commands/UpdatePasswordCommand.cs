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
    public int Id { get; set; }
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

        var user = _userManager.Users.SingleOrDefault(x => x.Id == command.Id);

        if (user is null)
        {
            return Error.AsResponse("User not found.", "userId");
        }

        var correctPassword = _userManager.CheckPasswordAsync(user, command.CurrentPassword).Result;

        if (correctPassword is false)
        {
            return Error.AsResponse("Current password is incorrect.", "current password");
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