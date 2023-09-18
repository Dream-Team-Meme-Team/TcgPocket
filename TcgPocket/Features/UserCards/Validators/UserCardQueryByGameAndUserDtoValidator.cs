using FluentValidation;

namespace TcgPocket.Features.UserCards.Validators;

public class UserCardQueryByGameAndUserDtoValidator : AbstractValidator<UserCardQueryByGameAndUserDto>
{
    public UserCardQueryByGameAndUserDtoValidator()
    {
        RuleFor(x => x.UserId)
            .GreaterThan(0);

        RuleFor(x => x.GameId)
            .GreaterThan(0);
    }
}