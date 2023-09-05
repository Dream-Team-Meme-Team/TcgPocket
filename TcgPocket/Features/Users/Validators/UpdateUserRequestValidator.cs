using FluentValidation;
using TcgPocket.Features.Users.Commands;

namespace TcgPocket.Features.Users.Validators;

public class UpdateUserRequestValidator : AbstractValidator<UpdateUserCommand>
{
    public UpdateUserRequestValidator(IValidator<UserDto> baseValidator)
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);

        RuleFor(x => x.User)
            .SetValidator(baseValidator);
    }
}