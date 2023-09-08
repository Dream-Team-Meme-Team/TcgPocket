using FluentValidation;
using TcgPocket.Features.UserRoles.Commands;

namespace TcgPocket.Features.UserRoles.Validators;

public class CreateUserRoleRequestValidator : AbstractValidator<CreateUserRoleCommand>
{
    public CreateUserRoleRequestValidator()
    {

    }
}