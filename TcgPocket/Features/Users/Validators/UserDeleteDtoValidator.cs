using FluentValidation;
using System.Text.RegularExpressions;
using TcgPocket.Features.Users.Dtos;

namespace TcgPocket.Features.Users.Validators;

public class UserDeleteDtoValidator : AbstractValidator<UserDeleteDto>
{
    public UserDeleteDtoValidator()
    {
        RuleFor(x => x.Password)
            .MaximumLength(25)
            .NotEmpty();

        RuleFor(x => x.ConfirmPassword)
            .Cascade(CascadeMode.Stop)
            .NotEmpty()
            .Equal(x => x.Password)
            .WithMessage("Passwords do not match.");
    }
}