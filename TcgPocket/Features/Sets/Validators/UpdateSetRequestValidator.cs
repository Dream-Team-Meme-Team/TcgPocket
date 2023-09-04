using FluentValidation;
using TcgPocket.Features.Sets.Commands;

namespace TcgPocket.Features.Sets.Validators;

public class UpdateSetRequestValidator : AbstractValidator<UpdateSetCommand>
{
    public UpdateSetRequestValidator(IValidator<SetDto> baseValidator)
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);

        RuleFor(x => x.Set)
            .SetValidator(baseValidator);
    }
}