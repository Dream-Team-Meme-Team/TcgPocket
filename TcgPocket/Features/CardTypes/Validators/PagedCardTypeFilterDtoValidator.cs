using FluentValidation;
using TcgPocket.Features.CardTypes.Dtos;

namespace TcgPocket.Features.CardTypes.Validators
{
    public class PagedCardTypeFilterDtoValidator : AbstractValidator<PagedCardTypeFilterDto>
    {
        public PagedCardTypeFilterDtoValidator()
        {
            RuleFor(x => x.Name)
                .MaximumLength(100);
        }
    }
}
