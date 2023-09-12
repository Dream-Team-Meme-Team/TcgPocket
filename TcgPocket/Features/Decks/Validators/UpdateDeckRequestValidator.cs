using FluentValidation;
using TcgPocket.Features.Decks.Commands;

namespace TcgPocket.Features.Decks.Validators;

public class UpdateDeckRequestValidator : AbstractValidator<UpdateDeckCommand>
{
    public UpdateDeckRequestValidator(IValidator<DeckDto> baseValidator)
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);

        RuleFor(x => x.Deck)
            .SetValidator(baseValidator);
    }
}