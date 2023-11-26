using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Features.Users;

namespace TcgPocket.Shared;

public static class SignInManagerExtensions
{
    public static async Task<User?> GetSignedInUserAsync(this SignInManager<User> signInManager)
    {
        var userName = signInManager.Context.User.Identity?.Name;

        if (userName is null) return null;

        var userManager = signInManager.UserManager; 
        var normalizedUserName = userManager.NormalizeName(userName);
        
        return await userManager
            .Users
            .Include(x => x.UserRoles)
            .ThenInclude(x => x.Role)
            .FirstOrDefaultAsync(x => x.NormalizedUserName == normalizedUserName);
    }
}