using FluentValidation;
using TcgPocket.Features.Decks.Commands;

namespace TcgPocket.Features.Decks.Validators;

public class CreateDeckCommandValidator : AbstractValidator<CreateDeckCommand>
{
    public CreateDeckCommandValidator(IValidator<DeckDto> baseValidator)
    {
        RuleFor(x => x.Deck)
            .SetValidator(baseValidator);
    }
}