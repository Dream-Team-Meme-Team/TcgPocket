using FluentValidation;
using TcgPocket.Features.Rarities.Commands;

namespace TcgPocket.Features.Rarities.Validation
{
    public class UpdateRarityCommandValidator : AbstractValidator<UpdateRarityCommand>
    {
        public UpdateRarityCommandValidator() 
        {
            RuleFor(x => x.Id)
                .NotEmpty()
                .GreaterThan(0);
            RuleFor(x => x.UpdateRarityDto.Name)
                .NotEmpty()
                .MaximumLength(50);
            RuleFor(x => x.UpdateRarityDto.GameId)
                .NotEmpty()
                .GreaterThan(0);
        }
    }
}
