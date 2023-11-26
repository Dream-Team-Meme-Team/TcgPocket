using FluentValidation;
using TcgPocket.Features.Roles.Commands;

namespace TcgPocket.Features.Roles.Validators;

public class DeleteRoleCommandValidator : AbstractValidator<DeleteRoleCommand>
{
    public DeleteRoleCommandValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);
    }
}