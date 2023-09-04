using FluentValidation;
using TcgPocket.Features.Attributes.Commands;

namespace TcgPocket.Features.Attributes.Validators;

public class DeleteAttributeCommandValidator : AbstractValidator<DeleteAttributeCommand>
{
    public DeleteAttributeCommandValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);
    }
}
