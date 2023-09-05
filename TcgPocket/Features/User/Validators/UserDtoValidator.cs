using FluentValidation;

namespace TcgPocket.Features.Users.Validators;

public class UserDtoValidator : AbstractValidator<UserDto>
{
    public UserDtoValidator()
    {
        RuleFor(x => x.Username)
            .MaximumLength(25)
            .NotEmpty();

        RuleFor(x => x.Password)
            .MaximumLength(25)
            .NotEmpty();
    }
}