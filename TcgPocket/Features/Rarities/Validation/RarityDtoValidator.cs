using FluentValidation;

namespace TcgPocket.Features.Rarities.Validation
{
    public class RarityDtoValidator : AbstractValidator<RarityDto>
    {
        public RarityDtoValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .MaximumLength(50);
            RuleFor(x => x.GameId)
                .NotEmpty()
                .GreaterThan(0);
        }
    }
}
