using FluentValidation;
using TcgPocket.Features.Rarities.Dtos.Requests;

namespace TcgPocket.Features.Rarities.Validation
{
    public class CreateRarityDtoValidator : AbstractValidator<CreateRarityDto>
    {
        public CreateRarityDtoValidator()
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
