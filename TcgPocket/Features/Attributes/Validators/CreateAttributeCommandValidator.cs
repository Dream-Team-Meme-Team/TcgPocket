using FluentValidation;
using TcgPocket.Features.Attributes.Commands;

namespace TcgPocket.Features.Attributes.Validators;

public class CreateAttributeCommandValidator : AbstractValidator<CreateAttributeCommand>
{
	public CreateAttributeCommandValidator(IValidator<AttributeDto> baseValidator)
	{
		RuleFor(x => x.Attribute)
			.SetValidator(baseValidator);
	}
}
