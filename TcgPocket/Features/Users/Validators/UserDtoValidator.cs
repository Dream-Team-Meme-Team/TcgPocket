using FluentValidation;
using System.Text.RegularExpressions;

namespace TcgPocket.Features.Users.Validators;

public class UserDtoValidator : AbstractValidator<UserDto>
{
    public UserDtoValidator()
    {
        var phoneNumberFormat = new Regex("^(\\+\\d{1,2}?)?\\(?\\d{3}\\)?[-]\\d{3}[-]\\d{4}$");

        RuleFor(x => x.UserName)
            .MaximumLength(25)
            .NotEmpty();

        RuleFor(x => x.Email)
            .EmailAddress();

        RuleFor(x => x.PhoneNumber)
            .Matches(phoneNumberFormat)
            .WithMessage("Invalid phone number. Must be in the format: ###-###-####");
    }
}