using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using TcgPocket.Shared;

namespace TcgPocket.Data;

public class DesignTimeDataContextFactory : IDesignTimeDbContextFactory<DataContext>
{
    public DataContext CreateDbContext(string[] args)
    {
        string projectPath = AppDomain.CurrentDomain.BaseDirectory.Split(new String[] { @"bin\" }, StringSplitOptions.None)[0];
        IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(projectPath)
            .AddJsonFile("appsettings.json")
            .Build();
        string connectionString = configuration.GetConnectionString(AppSettings.DefaultConnection);
        var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
        optionsBuilder.UseSqlServer(connectionString);
        // optionsBuilder.AddInterceptors(new SoftDeleteInterceptor());

        return new DataContext(optionsBuilder.Options);
    }
}