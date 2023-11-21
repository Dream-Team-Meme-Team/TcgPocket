using FluentValidation;

namespace TcgPocket.Features.Decks.Validators
{
    public class CreateDeckDtoValidator : AbstractValidator<CreateDeckDto>
    {
        public CreateDeckDtoValidator() 
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .MaximumLength(25);

            RuleFor(x => x.GameId)
                .NotEmpty()
                .GreaterThan(0);
        }
    }
}
