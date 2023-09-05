using FluentValidation;
using TcgPocket.Features.Rarities.Queries;

namespace TcgPocket.Features.Rarities.Validation
{
    public class GetRarityByIdQueryValidator : AbstractValidator<GetRarityByIdQuery>
    {
        public GetRarityByIdQueryValidator() 
        {
            RuleFor(x => x.Id)
                .NotEmpty()
                .GreaterThan(0);
        }
    }
}
