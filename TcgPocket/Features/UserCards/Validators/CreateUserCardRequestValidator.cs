using FluentValidation;
using TcgPocket.Features.UserCards.Commands;

namespace TcgPocket.Features.UserCards.Validators;

public class CreateUserCardRequestValidator : AbstractValidator<CreateUserCardCommand>
{
    public CreateUserCardRequestValidator(IValidator<UserCardDto> baseValidator)
    {
        RuleFor(x => x.UserCard)
            .SetValidator(baseValidator);
    }
}