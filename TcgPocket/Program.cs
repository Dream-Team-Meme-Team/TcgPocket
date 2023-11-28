using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TcgPocket;
using TcgPocket.Features.Roles;
using TcgPocket.Features.Users;
using TcgPocket.Data;
using TcgPocket.Shared;

var builder = WebApplication.CreateBuilder(args);
var environment = builder.Environment;
builder.Configuration.AddJsonFile("appsettings.json").AddJsonFile($"appsettings.{environment.EnvironmentName}.json", optional: true);
var startup = new Startup(builder);
startup.ConfigureServices(builder.Services);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseCors(policyBuilder =>
{
    policyBuilder.WithOrigins(builder.Configuration[AppSettings.CorsOrigins].Split(","))
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
});

Console.WriteLine($"DEBUG CONNECTION: {builder.Configuration[AppSettings.DefaultConnection]}");

SeedData(app);

void SeedData(IApplicationBuilder app)
{
    var scoped = app.ApplicationServices.CreateScope();

    var userManager = scoped.ServiceProvider.GetService<UserManager<User>>();
    var roleManager = scoped.ServiceProvider.GetService<RoleManager<Role>>();


    var dataContext = scoped.ServiceProvider.GetService<DataContext>();
    dataContext.Database.Migrate();
    dataContext.Seed(userManager, roleManager);
}

app.Run();
