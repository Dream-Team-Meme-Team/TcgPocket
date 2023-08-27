using AutoMapper;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Features;

namespace TcgPocket;

public class Startup
{
    private IConfigurationRoot _configuration { get; }

    public Startup(WebApplicationBuilder builder)
    {
        // builder;

        _configuration = builder.Configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddSingleton(_configuration);
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<Startup>());
        services.AddAutoMapper(typeof(IMapper));
        services.AddValidatorsFromAssemblyContaining<IValidator>();
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.AddDbContext<DataContext>(options =>
            options.UseSqlServer(_configuration.GetConnectionString(AppSettings.DefaultConnection)));
    }
}
