using FluentValidation;
using TcgPocket.Features.Games.Commands;

namespace TcgPocket.Features.Games.Validators;

public class CreateGameRequestValidator : AbstractValidator<CreateGameRequest>
{
    public CreateGameRequestValidator(IValidator<GameDto> baseValidator)
    {
        RuleFor(x => x.Game)
            .SetValidator(baseValidator);
    }
}