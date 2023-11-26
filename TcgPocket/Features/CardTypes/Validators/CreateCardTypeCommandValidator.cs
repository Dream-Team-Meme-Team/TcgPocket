using FluentValidation;
using TcgPocket.Features.CardTypes.Commands;

namespace TcgPocket.Features.CardTypes.Validators;

public class CreateCardTypeCommandValidator : AbstractValidator<CreateCardTypeCommand>
{
    public CreateCardTypeCommandValidator(IValidator<CardTypeDto> baseValidator)
    {
        RuleFor(x => x.CardType)
            .SetValidator(baseValidator);
    }
}