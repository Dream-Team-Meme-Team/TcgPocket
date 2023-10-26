using FluentValidation;
using TcgPocket.Features.Rarities.Dtos;

namespace TcgPocket.Features.Rarities.Validation
{
    public class PagedRarityFilterDtoValidator : AbstractValidator<PagedRarityFilterDto>
    {
        public PagedRarityFilterDtoValidator()
        {
            RuleFor(x => x.Name)
                .MaximumLength(100);
        }
    }
}
