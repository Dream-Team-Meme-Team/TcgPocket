using FluentValidation;
using TcgPocket.Features.UserCards;
using TcgPocket.Features.Users.Queries;

namespace TcgPocket.Features.Users.Validators;

public class GetAllCardsByGameIdAndUserIdQueryValidator : AbstractValidator<GetAllCardsByGameIdAndUserIdQuery>
{
    public GetAllCardsByGameIdAndUserIdQueryValidator(IValidator<UserCardQueryByGameAndUserDto> baseValidator)
    {
        RuleFor(x => x.UserCardQueryByGameAndUser)
            .SetValidator(baseValidator);
    }
}
