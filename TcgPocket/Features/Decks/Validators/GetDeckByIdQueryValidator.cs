using FluentValidation;
using TcgPocket.Features.Decks.Queries;

namespace TcgPocket.Features.Decks.Validators;

public class GetDeckByIdQueryValidator : AbstractValidator<GetDeckByIdQuery>
{
    public GetDeckByIdQueryValidator()
    {
        RuleFor(x => x.Id)
            .GreaterThan(0);
    }
}