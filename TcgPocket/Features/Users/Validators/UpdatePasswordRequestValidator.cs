using FluentValidation;
using TcgPocket.Features.Users.Commands;

namespace TcgPocket.Features.Users.Validators;

public class UpdatePasswordRequestValidator : AbstractValidator<UpdatePasswordCommand>
{
    public UpdatePasswordRequestValidator()
    {
        RuleFor(x => x.UserName)
            .NotEmpty();

        RuleFor(x => x.NewPasswordConfirmation)
            .NotEmpty();

        RuleFor(x => x.NewPassword)
            .NotEmpty()
            .Equal(x => x.NewPasswordConfirmation)
            .WithMessage("New Password and New Password Confirmation do not match.");
    }
}