using FluentValidation;
using TcgPocket.Features.UserCards.Commands;

namespace TcgPocket.Features.UserCards.Validators;

public class CreateUserCardCommandValidator : AbstractValidator<CreateUserCardCommand>
{
    public CreateUserCardCommandValidator(IValidator<UserCardDto> baseValidator)
    {
        RuleFor(x => x.UserCard)
            .SetValidator(baseValidator);
    }
}