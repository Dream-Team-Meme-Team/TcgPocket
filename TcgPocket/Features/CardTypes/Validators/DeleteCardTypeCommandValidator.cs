using FluentValidation;
using TcgPocket.Features.CardTypes.Commands;

namespace TcgPocket.Features.CardTypes.Validators;

public class DeleteCardTypeCommandValidator : AbstractValidator<DeleteCardTypeCommand>
{
    public DeleteCardTypeCommandValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);
    }
}