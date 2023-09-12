using FluentValidation;

namespace TcgPocket.Features.Roles.Validators;

public class RoleDtoValidator : AbstractValidator<RoleDto>
{
    public RoleDtoValidator()
    {
        RuleFor(x => x.Name)
            .MaximumLength(25)
            .NotEmpty();
    }
}