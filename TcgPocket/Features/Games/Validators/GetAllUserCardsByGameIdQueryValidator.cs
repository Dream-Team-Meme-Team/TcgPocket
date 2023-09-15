using FluentValidation;
using TcgPocket.Features.Games.Queries;

namespace TcgPocket.Features.Games.Validators;

public class GetAllUserCardsByGameIdQueryValidator : AbstractValidator<GetAllUserCardsByGameIdQuery>
{
    public GetAllUserCardsByGameIdQueryValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);
    }
}
