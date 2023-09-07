using FluentValidation;
using TcgPocket.Features.Rarities.Commands;

namespace TcgPocket.Features.Rarities.Validation
{
    public class DeleteRarityCommandValidator : AbstractValidator<DeleteRarityCommand>
    {
        public DeleteRarityCommandValidator() 
        {
            RuleFor(x => x.Id)
                .NotEmpty()
                .GreaterThan(0);
        }
    }
}
