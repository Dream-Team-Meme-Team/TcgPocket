using FluentValidation;
using TcgPocket.Features.Games.Commands;

namespace TcgPocket.Features.Games.Validators;

public class CreateGameRequestValidator : AbstractValidator<CreateGameCommand>
{
    public CreateGameRequestValidator(IValidator<GameDto> baseValidator)
    {
        RuleFor(x => x.Game)
            .SetValidator(baseValidator);
    }
}