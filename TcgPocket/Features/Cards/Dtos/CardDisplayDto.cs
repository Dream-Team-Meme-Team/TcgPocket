using TcgPocket.Features.CardAttributes.Dtos;
using TcgPocket.Features.CardTypes;
using TcgPocket.Features.Games;
using TcgPocket.Features.Rarities;
using TcgPocket.Features.Sets;

namespace TcgPocket.Features.Cards.Dtos;

public class CardDisplayDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string CardNumber { get; set; }
    public GameGetDto Game { get; set; }
    public CardTypeGetDto CardType { get; set; }
    public RarityGetDto Rarity { get; set; }
    public SetGetDto Set { get; set; }
    public string ImageUrl { get; set; }
    public string Description { get; set; }
    public List<CardAttributeDisplayDto> Attributes { get; set; }
}