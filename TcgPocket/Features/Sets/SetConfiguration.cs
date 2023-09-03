using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace TcgPocket.Features.Sets;

public class SetConfiguration : IEntityTypeConfiguration<Set>
{
    public void Configure(EntityTypeBuilder<Set> builder)
    {
        builder.ToTable(schema: "dbo", name: "Sets");
        builder.HasKey(x => x.Id);
        builder.HasOne(x => x.Game)
            .WithMany(x => x.Sets)
            .HasForeignKey(x => x.GameId)
            .IsRequired();
    }
}