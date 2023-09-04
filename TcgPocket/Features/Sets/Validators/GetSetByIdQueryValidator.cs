using FluentValidation;
using TcgPocket.Features.Sets.Queries;

namespace TcgPocket.Features.Sets.Validators;

public class GetSetByIdQueryValidator : AbstractValidator<GetSetByIdQuery>
{
    public GetSetByIdQueryValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);
    }
}