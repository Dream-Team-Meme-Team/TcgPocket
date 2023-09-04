using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace TcgPocket.Features.CardTypes;

public class CardTypeConfiguration : IEntityTypeConfiguration<CardType>
{
    public void Configure(EntityTypeBuilder<CardType> builder)
    {
        builder.ToTable( "CardTypes",  "dbo");

        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.Game)
            .WithMany(x => x.CardTypes)
            .HasForeignKey(x => x.GameId)
            .IsRequired();
    }
}