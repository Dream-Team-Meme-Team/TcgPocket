using FluentValidation;

namespace TcgPocket.Features.Cards.Validation
{
    public class CreateCardDtoValidator : AbstractValidator<CreateCardDto>
    {
        public CreateCardDtoValidator() 
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .MaximumLength(100);
            RuleFor(x => x.CardNumber)
                .NotEmpty();
            RuleFor(x => x.RarityId)
                .NotEmpty();
            RuleFor(x => x.SetId)
                .NotEmpty();
            RuleFor(x => x.CardTypeId)
                .NotEmpty();
            RuleFor(x => x.Description)
                .NotEmpty();
            RuleFor(x => x.GameId)
                .NotEmpty();
            RuleFor(x => x.ImageUrl)
                .NotEmpty();
            RuleFor(x => x.Attributes)
                .NotEmpty();
        }
    }
}
