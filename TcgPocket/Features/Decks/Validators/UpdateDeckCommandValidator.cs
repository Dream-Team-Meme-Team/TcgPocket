using FluentValidation;
using TcgPocket.Features.Decks.Commands;

namespace TcgPocket.Features.Decks.Validators;

public class UpdateDeckCommandValidator : AbstractValidator<UpdateDeckCommand>
{
    public UpdateDeckCommandValidator(IValidator<CreateDeckDto> baseValidator)
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);

        RuleFor(x => x.Deck)
            .SetValidator(baseValidator);
    }
}