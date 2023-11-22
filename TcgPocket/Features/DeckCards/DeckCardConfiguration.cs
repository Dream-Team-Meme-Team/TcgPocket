using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace TcgPocket.Features.DeckCards
{
    public class DeckCardConfiguration : IEntityTypeConfiguration<DeckCard> 
    {
        public void Configure(EntityTypeBuilder<DeckCard> entity)
        {
            entity.ToTable("DeckCards", "dbo");
        }
    }
}
