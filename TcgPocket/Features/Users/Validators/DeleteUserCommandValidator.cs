using FluentValidation;
using TcgPocket.Features.Users.Commands;
using TcgPocket.Features.Users.Dtos;

namespace TcgPocket.Features.Users.Validators;

public class DeleteUserCommandValidator : AbstractValidator<DeleteUserCommand>
{
    public DeleteUserCommandValidator(IValidator<UserDeleteDto> baseValidator)
    {
        RuleFor(x => x.DeleteDto)
            .SetValidator(baseValidator);
    }
}