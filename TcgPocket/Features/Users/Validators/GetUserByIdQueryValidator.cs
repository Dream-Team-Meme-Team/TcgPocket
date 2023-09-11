using FluentValidation;
using TcgPocket.Features.Users.Queries;

namespace TcgPocket.Features.Users.Validators;

public class GetUserByIdQueryValidator : AbstractValidator<GetUserByIdQuery>
{
    public GetUserByIdQueryValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);
    }
}