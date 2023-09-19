using TcgPocket.Features.CardAttributes;
using TcgPocket.Features.Games;
using TcgPocket.Shared.Interfaces;

namespace TcgPocket.Features.Attributes;

public class Attribute : AttributeGetDto, IEntity
{
	public Game Game { get; set; }
	public List<CardAttribute> CardAttributes { get; set; }
}

public class AttributeGetDto : AttributeDto
{
	public int Id { get; set; }
}

public class AttributeDto
{
	public int GameId { get; set; }
	public string Name { get; set; }
}
