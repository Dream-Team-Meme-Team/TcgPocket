using FluentValidation;
using TcgPocket.Features.Cards.Dtos;

namespace TcgPocket.Features.Cards.Validation;

public class PagedCardFilterDtoValidator : AbstractValidator<PagedCardFilterDto>
{
    public PagedCardFilterDtoValidator()
    {
        RuleFor(x => x.Name)
            .MaximumLength(100);
    }
}