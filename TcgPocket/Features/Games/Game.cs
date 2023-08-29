using AutoMapper;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TcgPocket.Common;

namespace TcgPocket.Features.Games;

public class Game : GameDto, IEntity
{
    public int Id { get; set; }
}

public class GameDto
{
    public string Name { get; set; }
}

public class GameMapper : Profile
{
    public GameMapper()
    {
        CreateMap<Game, GameDto>().ReverseMap();
        CreateMap<CreateGameCommand, Game>().ReverseMap();
    }
}

public class GameValidator : AbstractValidator<GameDto>
{
    public GameValidator()
    {
        RuleFor(x => x.Name)
            .MaximumLength(25)
            .NotEmpty();
    }
}

public class GameConfiguration : IEntityTypeConfiguration<Game>
{
    public void Configure(EntityTypeBuilder<Game> builder)
    {
        builder.ToTable(schema: "dbo", name: "Games");
    }
}