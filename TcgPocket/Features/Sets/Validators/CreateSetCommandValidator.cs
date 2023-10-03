using FluentValidation;
using TcgPocket.Features.Sets.Commands;

namespace TcgPocket.Features.Sets.Validators;

public class CreateSetCommandValidator : AbstractValidator<CreateSetCommand>
{
    public CreateSetCommandValidator(IValidator<SetDto> baseValidator)
    {
        RuleFor(x => x.Set)
            .SetValidator(baseValidator);
    }
}