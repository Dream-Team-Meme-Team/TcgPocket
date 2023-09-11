using FluentValidation;
using TcgPocket.Features.Roles.Commands;

namespace TcgPocket.Features.Roles.Validators;

public class CreateRoleRequestValidator : AbstractValidator<CreateRoleCommand>
{
    public CreateRoleRequestValidator(IValidator<RoleDto> baseValidator)
    {
        RuleFor(x => x.Role)
            .SetValidator(baseValidator);
    }
}