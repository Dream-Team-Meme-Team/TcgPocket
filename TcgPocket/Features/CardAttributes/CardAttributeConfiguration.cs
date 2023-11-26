using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace TcgPocket.Features.CardAttributes
{
    public class CardAttributeConfiguration : IEntityTypeConfiguration<CardAttribute>
    {
        public void Configure(EntityTypeBuilder<CardAttribute> entity) 
        {
            entity.ToTable("CardAttributes", "dbo");
        }
    }
}
