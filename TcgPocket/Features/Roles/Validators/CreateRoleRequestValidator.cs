using FluentValidation;
using Microsoft.AspNetCore.Identity;
using TcgPocket.Features.Roles.Commands;

namespace TcgPocket.Features.Roles.Validators;

public class CreateRoleRequestValidator : AbstractValidator<CreateRoleCommand>
{
    public CreateRoleRequestValidator()
    {
        
    }
}