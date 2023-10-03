using FluentValidation;
using TcgPocket.Features.Games.Commands;

namespace TcgPocket.Features.Games.Validators;

public class CreateGameCommandValidator : AbstractValidator<CreateGameCommand>
{
    public CreateGameCommandValidator(IValidator<GameDto> baseValidator)
    {
        RuleFor(x => x.Game)
            .SetValidator(baseValidator);
    }
}