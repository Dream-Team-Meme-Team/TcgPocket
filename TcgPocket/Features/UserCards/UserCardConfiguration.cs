using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace TcgPocket.Features.UserCards;

public class UserCardConfiguration : IEntityTypeConfiguration<UserCard>
{
    public void Configure(EntityTypeBuilder<UserCard> builder)
    {
        builder.ToTable("UserCards", "dbo");
        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.User)
            .WithMany(x => x.UserCards)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.ClientCascade)
            .IsRequired();

        builder.HasOne(x => x.Card)
            .WithMany(x => x.UserCards)
            .HasForeignKey(x => x.CardId)
            .OnDelete(DeleteBehavior.ClientCascade)
            .IsRequired();
    }
}