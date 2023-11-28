using FluentValidation;
using TcgPocket.Features.Cards.Dtos;

namespace TcgPocket.Features.Cards.Validation;

public class AddToInventoryDtoValidator : AbstractValidator<AddToInventoryDto>
{
    public AddToInventoryDtoValidator()
    {
        RuleFor(x => x.CardIds)
            .NotEmpty();

    }
}