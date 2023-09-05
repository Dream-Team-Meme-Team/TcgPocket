using FluentValidation;

namespace TcgPocket.Features.Users.Validators;

public class UserDtoValidator : AbstractValidator<UserDto>
{
    public UserDtoValidator()
    {
        RuleFor(x => x.UserName)
            .MaximumLength(25)
            .NotEmpty();
    }
}