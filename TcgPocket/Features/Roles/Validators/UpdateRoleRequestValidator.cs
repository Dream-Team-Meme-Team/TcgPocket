using FluentValidation;
using TcgPocket.Features.Roles.Commands;

namespace TcgPocket.Features.Roles.Validators;

public class UpdateRoleRequestValidator : AbstractValidator<UpdateRoleCommand>
{
    public UpdateRoleRequestValidator(IValidator<RoleDto> baseValidator)
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);

        RuleFor(x => x.Role)
            .SetValidator(baseValidator);
    }
}