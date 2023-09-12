using TcgPocket;

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
// app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseCors(policyBuilder =>
{
    policyBuilder.WithOrigins(builder.Configuration["CorsOrigins"].Split(","))
        .AllowAnyMethod()
        .AllowAnyHeader();
});

app.Run();
