using FluentValidation;
using TcgPocket.Features.Games.Commands;

namespace TcgPocket.Features.Games.Validators;

public class DeleteGameCommandValidator : AbstractValidator<DeleteGameCommand>
{
    public DeleteGameCommandValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);
    }
}