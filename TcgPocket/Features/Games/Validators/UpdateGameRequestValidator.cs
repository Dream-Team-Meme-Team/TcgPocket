using FluentValidation;
using TcgPocket.Features.Games.Commands;

namespace TcgPocket.Features.Games.Validators;

public class UpdateGameRequestValidator : AbstractValidator<UpdateGameCommand>
{
    public UpdateGameRequestValidator(IValidator<GameDto> baseValidator)
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);

        RuleFor(x => x.Game)
            .SetValidator(baseValidator);
    }
}