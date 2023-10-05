using TcgPocket.Features.Attributes;
using TcgPocket.Features.Cards;
using TcgPocket.Shared.Interfaces;
using Attribute = TcgPocket.Features.Attributes.Attribute;

namespace TcgPocket.Features.CardAttributes
{
    public class CardAttribute : CardAttributeGetDto, IEntity
    {
        public Card Card { get; set; }
        public Attribute Attribute { get; set; }
    }

    public class CardAttributeGetDto : CardAttributeDto
    {
        public int Id { get; set; }
    }

    public class CardAttributeDto
    {
        public int CardId { get; set; }
        public int AttributeId { get; set; }
    }
}
