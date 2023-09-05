using FluentValidation;

namespace TcgPocket.Features.CardTypes.Validators;

public class CardTypeDtoValidator : AbstractValidator<CardTypeDto>
{
    public CardTypeDtoValidator()
    {
        RuleFor(x => x.Name)
            .MaximumLength(25)
            .NotEmpty();

        RuleFor(x => x.GameId)
            .GreaterThan(0);
    }
}