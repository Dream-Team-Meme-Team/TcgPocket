using FluentValidation;
using TcgPocket.Features.Sets.Commands;

namespace TcgPocket.Features.Sets.Validators;

public class DeleteSetCommandValidator : AbstractValidator<DeleteSetCommand>
{
    public DeleteSetCommandValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);
    }
}