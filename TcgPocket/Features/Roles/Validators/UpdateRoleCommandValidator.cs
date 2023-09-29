using FluentValidation;
using TcgPocket.Features.Roles.Commands;

namespace TcgPocket.Features.Roles.Validators;

public class UpdateRoleCommandValidator : AbstractValidator<UpdateRoleCommand>
{
    public UpdateRoleCommandValidator(IValidator<RoleDto> baseValidator)
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);

        RuleFor(x => x.Role)
            .SetValidator(baseValidator);
    }
}