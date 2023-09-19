using Microsoft.AspNetCore.Identity;
using TcgPocket.Features.Users;

namespace TcgPocket.Shared;

public static class SignInManagerExtensions
{
    public static async Task<User?> GetSignedInUserAsync(this SignInManager<User> signInManager)
    {
        var userName = signInManager.Context.User.Identity?.Name;

        if (userName is null) return null;

        return await signInManager.UserManager.FindByNameAsync(userName);
    }
}