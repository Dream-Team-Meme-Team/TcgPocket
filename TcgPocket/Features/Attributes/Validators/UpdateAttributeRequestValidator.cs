using FluentValidation;
using TcgPocket.Features.Attributes.Commands;

namespace TcgPocket.Features.Attributes.Validators;

public class UpdateAttributeRequestValidator : AbstractValidator<UpdateAttrbuteRequest>
{
	public UpdateAttributeRequestValidator(IValidator<AttributeDto>)
	{
		RuleFor(x => x.Id)
			.GreaterThan(0);

		RuleFor(x => x.Attribute)
			.SetValidator(baseValidator);
	}
}
