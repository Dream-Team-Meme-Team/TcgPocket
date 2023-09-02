using FluentValidation;
using TcgPocket.Features.Games.Queries;

namespace TcgPocket.Features.Games.Validators;

public class GetGameByIdQueryValidator : AbstractValidator<GetGameByIdQuery>
{
    public GetGameByIdQueryValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);
    }
}