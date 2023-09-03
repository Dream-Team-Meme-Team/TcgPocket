using FluentValidation;
using TcgPocket.Features.Sets.Commands;

namespace TcgPocket.Features.Sets.Validators;

public class CreateSetRequestValidator : AbstractValidator<CreateSetCommand>
{
    public CreateSetRequestValidator(IValidator<SetDto> baseValidator)
    {
        RuleFor(x => x.Set)
            .SetValidator(baseValidator);
    }
}