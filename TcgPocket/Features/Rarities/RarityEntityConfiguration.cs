using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace TcgPocket.Features.Rarities
{
    public class RarityEntityConfiguration : IEntityTypeConfiguration<Rarity>
    {
        public void Configure(EntityTypeBuilder<Rarity> entity)
        {
            entity.ToTable("Rarities", "dbo");

            entity.HasKey(x => x.Id);

            entity.HasOne(x => x.Game)
                .WithMany(y => y.Rarities)
                .HasForeignKey(x => x.GameId)
                .OnDelete(DeleteBehavior.ClientCascade);
        }
    }
}
