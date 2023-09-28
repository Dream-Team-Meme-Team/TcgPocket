using FluentValidation;

namespace TcgPocket.Features.UserCards.Validators;

public class UserCardDtoValidator : AbstractValidator<UserCardDto>
{
    public UserCardDtoValidator()
    {
        RuleFor(x => x.UserId)
            .GreaterThan(0);

        RuleFor(x => x.CardId)
            .GreaterThan(0);
    }
}