using FluentValidation;
using TcgPocket.Features.Decks.Commands;

namespace TcgPocket.Features.Decks.Validators;

public class CreateDeckCommandValidator : AbstractValidator<CreateDeckCommand>
{
    public CreateDeckCommandValidator(IValidator<CreateDeckDto> baseValidator)
    {
        RuleFor(x => x.Deck)
            .SetValidator(baseValidator);
    }
}