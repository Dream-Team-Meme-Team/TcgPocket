using FluentValidation;
using TcgPocket.Features.UserCards.Commands;

namespace TcgPocket.Features.UserCards.Validators;

public class DeleteUserCardCommandValidator : AbstractValidator<DeleteUserCardCommand>
{
    public DeleteUserCardCommandValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);
    }
}