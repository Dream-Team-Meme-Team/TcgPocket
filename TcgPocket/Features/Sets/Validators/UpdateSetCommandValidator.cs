using FluentValidation;
using TcgPocket.Features.Sets.Commands;

namespace TcgPocket.Features.Sets.Validators;

public class UpdateSetCommandValidator : AbstractValidator<UpdateSetCommand>
{
    public UpdateSetCommandValidator(IValidator<SetDto> baseValidator)
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);

        RuleFor(x => x.Set)
            .SetValidator(baseValidator);
    }
}