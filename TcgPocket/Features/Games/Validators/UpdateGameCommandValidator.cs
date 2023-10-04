using FluentValidation;
using TcgPocket.Features.Games.Commands;

namespace TcgPocket.Features.Games.Validators;

public class UpdateGameCommandValidator : AbstractValidator<UpdateGameCommand>
{
    public UpdateGameCommandValidator(IValidator<GameDto> baseValidator)
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);

        RuleFor(x => x.Game)
            .SetValidator(baseValidator);
    }
}