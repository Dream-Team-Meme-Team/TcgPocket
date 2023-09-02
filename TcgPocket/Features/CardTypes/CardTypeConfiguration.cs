using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace TcgPocket.Features.CardTypes;

public class CardTypeConfiguration : IEntityTypeConfiguration<CardType>
{
    public void Configure(EntityTypeBuilder<CardType> builder)
    {
        builder.ToTable(schema: "dbo", name: "CardTypes");

        builder.HasOne(x => x.Game)
            .WithMany(x => x.CardTypes)
            .HasForeignKey(x => x.GameId)
            .IsRequired();
    }
}