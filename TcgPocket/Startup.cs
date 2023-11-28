using System.Reflection;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using TcgPocket.Data;
using TcgPocket.Features.Users;
using TcgPocket.Features.Roles;
using TcgPocket.Settings;
using TcgPocket.Shared;

namespace TcgPocket;

public class Startup
{
    private ConfigurationManager _configuration { get; }
    
    public Startup(WebApplicationBuilder builder)
    {
        _configuration = builder.Configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddSingleton(_configuration);
        services.AddSingleton<ISettingsProvider, SettingsProvider>();
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<Startup>());
        services.AddAutoMapper(Assembly.GetExecutingAssembly());
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.AddCors();
        services.AddDbContext<DataContext>(options =>
            options.UseSqlServer(_configuration.GetConnectionString(AppSettings.DefaultConnection)));

        ConfigureIdentity(services);
    }

    private void ConfigureIdentity(IServiceCollection services)
    {
        services.AddIdentity<User, Role>()  
            .AddRoles<Role>()
            .AddRoleManager<RoleManager<Role>>()
            .AddUserManager<UserManager<User>>()
            .AddSignInManager<SignInManager<User>>()
            .AddEntityFrameworkStores<DataContext>()
            .AddDefaultTokenProviders();  
        
        services.Configure<IdentityOptions>(options =>
        {
            options.Password.RequireDigit = true;
            options.Password.RequireLowercase = true;
            options.Password.RequireNonAlphanumeric = true;
            options.Password.RequireUppercase = true;
            options.Password.RequiredLength = 6;
            options.Password.RequiredUniqueChars = 1;

            options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
            options.Lockout.MaxFailedAccessAttempts = 5;
            options.Lockout.AllowedForNewUsers = true;

            options.User.AllowedUserNameCharacters =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
            options.User.RequireUniqueEmail = false;
        });

        services.ConfigureApplicationCookie(options =>
        {
            options.Cookie.HttpOnly = true;
            options.Cookie.SameSite = SameSiteMode.None;
            options.ExpireTimeSpan = TimeSpan.FromMinutes(5);

            options.LoginPath = "/Identity/Account/Login";
            options.AccessDeniedPath = "/Identity/Account/AccessDenied";
            options.SlidingExpiration = true;
        });
    }
}
