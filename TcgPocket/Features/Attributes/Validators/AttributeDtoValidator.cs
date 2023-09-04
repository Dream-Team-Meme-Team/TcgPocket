using FluentValidation;

namespace TcgPocket.Features.Attributes.Validators;

public class AttributeDtoValidator : AbstractValidator<AttributeDto>
{
	public AttributeDtoValidator()
	{
		RuleFor(x => x.Name)
			.MaximumLength(25)
			.NotEmpty();

		RuleFor(x => x.GameId)
			.GreaterThan(0);
	}
}
