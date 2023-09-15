using FluentValidation;
using TcgPocket.Features.UserCards.Commands;

namespace TcgPocket.Features.UserCards.Validators;

public class UpdateUserCardRequestValidator : AbstractValidator<UpdateUserCardCommand>
{
    public UpdateUserCardRequestValidator(IValidator<UserCardDto> baseValidator)
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);

        RuleFor(x => x.UserCard)
            .SetValidator(baseValidator);
    }
}