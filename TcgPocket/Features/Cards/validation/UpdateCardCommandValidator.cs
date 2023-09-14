using FluentValidation;
using TcgPocket.Features.Cards.TestFolder;
using TcgPocket.Shared.Interfaces;

namespace TcgPocket.Features.Cards.Validation
{
    public class UpdateCardCommandValidator : AbstractValidator<UpdateCardCommand>
    {
        public UpdateCardCommandValidator(IValidator<CardDto> cardValidator) 
        {
            RuleFor(x => x.Id)
                .NotEmpty()
                .GreaterThan(0);
            RuleFor(x => x.CardDto)
                .SetValidator(cardValidator);
        }
    }
}
