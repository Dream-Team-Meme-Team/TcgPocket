using Microsoft.AspNetCore.Identity;
using TcgPocket;
using TcgPocket.Features.Roles;
using TcgPocket.Features.Users;
using TcgPocket.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddJsonFile("appsettings.json");
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
    policyBuilder.WithOrigins(builder.Configuration["CorsOrigins"].Split(","))
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
});

SeedData(app);

void SeedData(IApplicationBuilder app)
{
    var scoped = app.ApplicationServices.CreateScope();

    var userManager = scoped.ServiceProvider.GetService<UserManager<User>>();
    var roleManager = scoped.ServiceProvider.GetService<RoleManager<Role>>();


    var dataContext = scoped.ServiceProvider.GetService<DataContext>();
    dataContext.Seed(userManager, roleManager);
}

app.Run();
