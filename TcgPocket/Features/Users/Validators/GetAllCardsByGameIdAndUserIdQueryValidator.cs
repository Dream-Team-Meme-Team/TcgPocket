using FluentValidation;
using TcgPocket.Features.Users.Dtos;
using TcgPocket.Features.Users.Queries;

namespace TcgPocket.Features.Users.Validators;

public class GetAllCardsByGameIdAndUserIdQueryValidator : AbstractValidator<GetAllCardsByGameIdAndUserIdQuery>
{
    public GetAllCardsByGameIdAndUserIdQueryValidator(IValidator<UserCardGameDto> baseValidator)
    {
        RuleFor(x => x.UserCardGame)
            .SetValidator(baseValidator);
    }
}
