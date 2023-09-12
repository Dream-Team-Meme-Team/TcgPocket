using FluentValidation;
using TcgPocket.Features.Decks.Commands;

namespace TcgPocket.Features.Decks.Validators;

public class CreateDeckRequestValidator : AbstractValidator<CreateDeckCommand>
{
    public CreateDeckRequestValidator(IValidator<DeckDto> baseValidator)
    {
        RuleFor(x => x.Deck)
            .SetValidator(baseValidator);
    }
}