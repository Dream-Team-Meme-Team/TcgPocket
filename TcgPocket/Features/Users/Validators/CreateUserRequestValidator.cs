using FluentValidation;
using TcgPocket.Features.Users.Commands;

namespace TcgPocket.Features.Users.Validators;

public class CreateUserRequestValidator : AbstractValidator<CreateUserCommand>
{
    public CreateUserRequestValidator(IValidator<UserDto> baseValidator)
    {
        RuleFor(x => x.User)
            .SetValidator(baseValidator);
    }
}