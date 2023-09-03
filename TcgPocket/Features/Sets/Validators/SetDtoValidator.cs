using FluentValidation;

namespace TcgPocket.Features.Sets.Validators;

public class SetDtoValidator : AbstractValidator<SetDto>
{
    public SetDtoValidator()
    {
        RuleFor(x => x.Name)
            .MaximumLength(25)
            .NotEmpty();

        RuleFor(x => x.GameId)
            .GreaterThan(0);
    }
}