using FluentValidation;

namespace TcgPocket.Features.Decks.Validators;

public class DeckDtoValidator : AbstractValidator<DeckDto>
{
    public DeckDtoValidator()
    {
        RuleFor(x => x.Name)
            .MaximumLength(25)
            .NotEmpty();

        RuleFor(x => x.UserId)
            .GreaterThan(0);
    }
}