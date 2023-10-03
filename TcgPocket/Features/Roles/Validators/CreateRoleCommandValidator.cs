using FluentValidation;
using TcgPocket.Features.Roles.Commands;

namespace TcgPocket.Features.Roles.Validators;

public class CreateRoleCommandValidator : AbstractValidator<CreateRoleCommand>
{
    public CreateRoleCommandValidator(IValidator<RoleDto> baseValidator)
    {
        RuleFor(x => x.Role)
            .SetValidator(baseValidator);
    }
}