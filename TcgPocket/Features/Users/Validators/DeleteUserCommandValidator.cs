using FluentValidation;
using TcgPocket.Features.Users.Commands;

namespace TcgPocket.Features.Users.Validators;

public class DeleteUserCommandValidator : AbstractValidator<DeleteUserCommand>
{
    public DeleteUserCommandValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);
    }
}