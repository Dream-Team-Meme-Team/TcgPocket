using FluentValidation;
using TcgPocket.Features.UserCards.Queries;

namespace TcgPocket.Features.UserCards.Validators;

public class GetUserCardByIdQueryValidator : AbstractValidator<GetUserCardByIdQuery>
{
    public GetUserCardByIdQueryValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);
    }
}