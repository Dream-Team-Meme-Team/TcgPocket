using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using TcgPocket.Shared;

namespace TcgPocket.Data;

public class DesignTimeDataContextFactory : IDesignTimeDbContextFactory<DataContext>
{
    public DataContext CreateDbContext(string[] args)
    {
        var configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .Build();

        var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
        optionsBuilder.UseSqlServer(configuration.GetConnectionString(AppSettings.DefaultConnection));
        // optionsBuilder.AddInterceptors(new SoftDeleteInterceptor());

        return new DataContext(optionsBuilder.Options);
    }
}