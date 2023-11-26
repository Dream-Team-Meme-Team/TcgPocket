using FluentValidation;
using TcgPocket.Features.Decks.Commands;

namespace TcgPocket.Features.Decks.Validators;

public class DeleteDeckCommandValidator : AbstractValidator<DeleteDeckCommand>
{
    public DeleteDeckCommandValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);
    }
}