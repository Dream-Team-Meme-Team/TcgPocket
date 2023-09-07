using FluentValidation;
using TcgPocket.Features.CardTypes.Queries;

namespace TcgPocket.Features.Attributes.Validators;

public class GetAttributeByIdQueryValidator : AbstractValidator<GetCardTypeByIdQuery>
{
    public GetAttributeByIdQueryValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);
    }
}
