using FluentValidation;
using TcgPocket.Features.CardTypes.Commands;

namespace TcgPocket.Features.CardTypes.Validators;

public class CreateCardTypeRequestValidator : AbstractValidator<CreateCardTypeCommand>
{
    public CreateCardTypeRequestValidator(IValidator<CardTypeDto> baseValidator)
    {
        RuleFor(x => x.CardType)
            .SetValidator(baseValidator);
    }
}