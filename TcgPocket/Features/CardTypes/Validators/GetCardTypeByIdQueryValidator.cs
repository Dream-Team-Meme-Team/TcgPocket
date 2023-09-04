using FluentValidation;
using TcgPocket.Features.CardTypes.Queries;

namespace TcgPocket.Features.CardTypes.Validators;

public class GetCardTypeByIdQueryValidator : AbstractValidator<GetCardTypeByIdQuery>
{
    public GetCardTypeByIdQueryValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);
    }
}