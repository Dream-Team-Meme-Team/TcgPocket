using FluentValidation;
using TcgPocket.Features.Users.Commands;

namespace TcgPocket.Features.Users.Validators
{
    public class AddRoleToUserCommandValidator : AbstractValidator<AddRoleToUserCommand>
    {
        public AddRoleToUserCommandValidator()
        {
            RuleFor(x => x.Id)
            .GreaterThan(0);
            RuleFor(x => x.RoleName)
                .NotEmpty();
        }
    }
}
