﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace TcgPocket.Features.Cards
{
    public class CardConfiguration : IEntityTypeConfiguration<Card>
    {
        public void Configure(EntityTypeBuilder<Card> entity)
        {
            entity.ToTable("Cards", "dbo");

            entity.HasKey(x => x.Id);

            entity.HasOne(x => x.Game)
                .WithMany(x => x.Cards)
                .HasForeignKey(x => x.GameId)
                .OnDelete(DeleteBehavior.ClientCascade)
                .IsRequired();
            entity.HasOne(x => x.CardType)
                .WithMany(x => x.Cards)
                .HasForeignKey(x => x.CardTypeId)
                .OnDelete(DeleteBehavior.ClientCascade)
                .IsRequired();
            entity.HasOne(x => x.Rarity)
                .WithMany(x => x.Cards)
                .HasForeignKey(x => x.RarityId)
                .OnDelete(DeleteBehavior.ClientCascade)
                .IsRequired();
            entity.HasOne(x => x.Set)
                .WithMany(x => x.Cards)
                .HasForeignKey(x => x.SetId)
                .OnDelete(DeleteBehavior.ClientCascade)
                .IsRequired();
        }
    }
}
