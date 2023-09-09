using FluentValidation;
using TcgPocket.Features.Users.Commands;

namespace TcgPocket.Features.Users.Validators
{
    public class RemoveRoleFromUserCommandValidator : AbstractValidator<RemoveRoleFromUserCommand>
    {
        public RemoveRoleFromUserCommandValidator() 
        {
            RuleFor(x => x.UserId)
            .GreaterThan(0);
            RuleFor(x => x.RoleName)
                .NotEmpty();
        }
    }
}
