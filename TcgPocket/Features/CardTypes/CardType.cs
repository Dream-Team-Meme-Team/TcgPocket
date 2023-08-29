using AutoMapper;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TcgPocket.Common;
using TcgPocket.Features.Games;

namespace TcgPocket.Features.CardTypes;

public class CardType : CardTypeDto, IEntity
{
    public int Id { get; set; }
    public Game Game { get; set; }
}

public class CardTypeDto
{
    public int GameId { get; set; }
    public string Name { get; set; }
}

public class CardTypeMapper : Profile
{
    public CardTypeMapper()
    {
        CreateMap<CardType, CardTypeDto>().ReverseMap();
    }
}

public class CardTypeValidator : AbstractValidator<CardTypeDto>
{
    public CardTypeValidator()
    {
        RuleFor(x => x.Name)
            .MaximumLength(25)
            .NotEmpty();

        RuleFor(x => x.GameId)
            .GreaterThan(0);
    }
}

public class CardTypeConfiguration : IEntityTypeConfiguration<CardType>
{
    public void Configure(EntityTypeBuilder<CardType> builder)
    {
        builder.ToTable(schema: "dbo", name: "CardTypes");
    }
}