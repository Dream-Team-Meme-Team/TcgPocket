using FluentValidation;
using TcgPocket.Features.Rarities.Commands;

namespace TcgPocket.Features.Rarities.Validation
{
    public class UpdateRarityCommandValidator : AbstractValidator<UpdateRarityCommand>
    {
        public UpdateRarityCommandValidator(IValidator<RarityDto> baseValidator) 
        {
            RuleFor(x => x.Id)
                .NotEmpty()
                .GreaterThan(0);
            RuleFor(x => x.RarityDto)
                .SetValidator(baseValidator);
        }
    }
}
