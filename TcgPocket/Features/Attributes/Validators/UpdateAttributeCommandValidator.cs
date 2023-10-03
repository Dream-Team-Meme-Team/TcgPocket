using FluentValidation;
using TcgPocket.Features.Attributes.Commands;

namespace TcgPocket.Features.Attributes.Validators;

public class UpdateAttributeCommandValidator : AbstractValidator<UpdateAttributeCommand>
{
	public UpdateAttributeCommandValidator(IValidator<AttributeDto> baseValidator)
	{
		RuleFor(x => x.Id)
			.GreaterThan(0);

		RuleFor(x => x.Attribute)
			.SetValidator(baseValidator);
	}
}
