#pragma warning disable CS8618
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Features.Roles;
using TcgPocket.Features.UserRoles;
using TcgPocket.Features.Users;

namespace TcgPocket.Data;

public class DataContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>> 
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityUserClaim<int>>().ToTable("AspNetUserClaims", "identity");
        modelBuilder.Entity<IdentityUserLogin<int>>().ToTable("AspNetUserLogins", "identity");
        modelBuilder.Entity<IdentityRoleClaim<int>>().ToTable("AspNetRoleClaims", "identity");
        modelBuilder.Entity<IdentityUserToken<int>>().ToTable("AspNetUserTokens", "identity");

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(DataContext).Assembly);
    }
}