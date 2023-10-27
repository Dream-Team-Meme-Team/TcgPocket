using FluentValidation;
using TcgPocket.Features.Attributes.Dtos;

namespace TcgPocket.Features.Attributes.Validators
{
    public class PagedAttributeFilterDtoValidator : AbstractValidator<PagedAttributeFilterDto>
    {
        public PagedAttributeFilterDtoValidator()
        {
            RuleFor(x => x.Name)
                .MaximumLength(100);
        }
    }
}
