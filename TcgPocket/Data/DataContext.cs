#pragma warning disable CS8618
using Microsoft.EntityFrameworkCore;
using TcgPocket.Features.Games;
using TcgPocket.Features.Rarities;

namespace TcgPocket.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(DataContext).Assembly);
    }
}