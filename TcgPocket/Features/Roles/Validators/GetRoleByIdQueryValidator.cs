using FluentValidation;
using TcgPocket.Features.Roles.Queries;

namespace TcgPocket.Features.Roles.Validators;

public class GetRoleByIdQueryValidator : AbstractValidator<GetRoleByIdQuery>
{
    public GetRoleByIdQueryValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);
    }
}