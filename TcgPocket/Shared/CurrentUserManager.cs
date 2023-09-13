using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using TcgPocket.Features.Users;

namespace TcgPocket.Shared;

public class CurrentUserManager
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<User> _userManager;

    public CurrentUserManager(IHttpContextAccessor httpContextAccessor,
        UserManager<User> userManager)
    {
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
    }
    
    public Task<User?> GetCurrentUserAsync()
    {
        var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userId is null) return null;

        return _userManager.FindByIdAsync(userId);
    }
}