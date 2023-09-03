using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using TcgPocket.Shared;

namespace TcgPocket.Data;

public class DesignTimeDataContextFactory : IDesignTimeDbContextFactory<DataContext>
{
    public DataContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
        optionsBuilder.UseSqlServer(AppSettings.DefaultConnection);
        // optionsBuilder.AddInterceptors(new SoftDeleteInterceptor());

        return new DataContext(optionsBuilder.Options);
    }
}