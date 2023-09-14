using FluentValidation;
using TcgPocket.Shared.Interfaces;

namespace TcgPocket.Shared.Validation
{
    public class IIdentifiableValidator : AbstractValidator<IIdentifiable>
    {
        public IIdentifiableValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty()
                .GreaterThan(0);
        }
    }
}
