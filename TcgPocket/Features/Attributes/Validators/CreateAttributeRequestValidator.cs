﻿using FluentValidation;
using TcgPocket.Features.Attributes.Commands;

namespace TcgPocket.Features.Attributes.Validators;

public class CreateAttributeRequestValidator : AbstractValidator<CreateAttributeCommand>
{
	public CreateAttributeRequestValidator(IValidator<AttributeDto> baseValidator)
	{
		RuleFor(x => x.Attribute)
			.SetValidator(baseValidator);
	}
}