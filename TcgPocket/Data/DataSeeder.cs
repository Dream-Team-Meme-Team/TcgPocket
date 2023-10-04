using Microsoft.AspNetCore.Identity;
using TcgPocket.Features.Roles;
using TcgPocket.Features.Users;

namespace TcgPocket.Data;

public static class DataSeeder
{
    public static void Seed(this DataContext dataContext, UserManager<User> userManager, RoleManager<Role> roleManager)
    {
        SeedUsersAndRoles(dataContext, userManager, roleManager).Wait();

        dataContext.SaveChanges();
    }

    private static async Task SeedUsersAndRoles(DataContext dataContext, UserManager<User> userManager, RoleManager<Role> roleManager)
    {
        var roleNames = new List<String>{"Basic", "Admin"};

        foreach (var roleName in roleNames)
        {
            var roleExists = await roleManager.RoleExistsAsync(roleName);
            if (!roleExists)
            {
                await roleManager.CreateAsync(new Role { Name = roleName });
            }
        }

        var devAccountUser = new User
        {
            Email = "tcg@yamomma.com",
            UserName = "tcg@yamomma.com",
            PhoneNumber = "9859859859",
        };

        var devAccount = await userManager.FindByEmailAsync(devAccountUser.Email);

        if(devAccount is null)
        {
            await userManager.CreateAsync(devAccountUser, "Password1!");
            userManager.AddToRoleAsync(devAccountUser, "Admin");
        }
    }
}
