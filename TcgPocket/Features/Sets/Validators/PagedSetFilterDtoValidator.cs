using FluentValidation;
using TcgPocket.Features.Sets.Dtos;

namespace TcgPocket.Features.Sets.Validators
{
    public class PagedSetFilterDtoValidator : AbstractValidator<PagedSetFilterDto>
    {
        public PagedSetFilterDtoValidator()
        {
            RuleFor(x => x.Name)
                .MaximumLength(100);
        }
    }
}
