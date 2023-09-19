using TcgPocket.Features.Cards;
using TcgPocket.Features.Users;
using TcgPocket.Shared.Dtos;
using TcgPocket.Shared.Interfaces;

namespace TcgPocket.Features.UserCards;

public class UserCard : UserCardGetDto, IEntity
{
    public User User { get; set; }
    public Card Card { get; set; }
}

public class UserCardGetDto : UserCardDto
{
    public int Id { get; set; }
}

public class UserCardDto
{
    public int UserId { get; set; }
    public int CardId { get; set; }
}
