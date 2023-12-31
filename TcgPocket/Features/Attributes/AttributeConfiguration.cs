﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace TcgPocket.Features.Attributes;

public class AttributeConfiguration : IEntityTypeConfiguration<Attribute>
{
	public void Configure(EntityTypeBuilder<Attribute> builder)
	{
		builder.ToTable("Attributes", "dbo");

		builder.HasKey(x => x.Id);

		builder.HasOne(x => x.Game)
			.WithMany(x => x.Attributes)
			.HasForeignKey(x => x.GameId)
			.IsRequired();
	}
}
