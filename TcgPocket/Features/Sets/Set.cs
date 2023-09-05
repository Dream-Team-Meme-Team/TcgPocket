using TcgPocket.Features.Games;
using TcgPocket.Shared.Interfaces;

namespace TcgPocket.Features.Sets;

public class Set : SetGetDto, IEntity
{
    public Game Game { get; set; }
}

public class SetGetDto : SetDto
{
    public int Id { get; set; }
}

public class SetDto
{
    public int GameId { get; set; }
    public string Name { get; set; }
}