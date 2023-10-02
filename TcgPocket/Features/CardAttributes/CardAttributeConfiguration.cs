using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace TcgPocket.Features.CardAttributes
{
    public class CardAttributeConfiguration : IEntityTypeConfiguration<CardAttribute>
    {
        public void Configure(EntityTypeBuilder<CardAttribute> entity) 
        {
            entity.ToTable("CardAttributes", "dbo");

            entity.HasKey(x => x.Id);

            entity.HasOne(x => x.Card)
                .WithMany(x => x.CardAttributes)
                .HasForeignKey(x => x.CardId)
                .IsRequired();
            entity.HasOne(x => x.Attribute)
                .WithMany(x => x.CardAttributes)
                .HasForeignKey(x => x.AttributeId)
                .IsRequired();
        }
    }
}
