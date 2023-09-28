using FluentValidation;
using TcgPocket.Features.UserCards;
using TcgPocket.Features.Users.Queries;

namespace TcgPocket.Features.Users.Validators;

public class GetAllCardsByUserIdQueryValidator : AbstractValidator<GetAllCardsByUserIdQuery>
{
    public GetAllCardsByUserIdQueryValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);
    }
}
