using FluentValidation;
using TcgPocket.Features.CardTypes.Commands;

namespace TcgPocket.Features.CardTypes.Validators;

public class UpdateCardTypeCommandValidator : AbstractValidator<UpdateCardTypeCommand>
{
    public UpdateCardTypeCommandValidator(IValidator<CardTypeDto> baseValidator)
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);

        RuleFor(x => x.CardType)
            .SetValidator(baseValidator);
    }
}