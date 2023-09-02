using FluentValidation;

namespace TcgPocket.Features.Games.Validators;

public class GameDtoValidator : AbstractValidator<GameDto>
{
    public GameDtoValidator()
    {
        RuleFor(x => x.Name)
            .MaximumLength(25)
            .NotEmpty();
    }
}