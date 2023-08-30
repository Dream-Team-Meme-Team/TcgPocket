namespace TcgPocket.Common;

public interface IEntity : IIdentifiable
{
}

public interface IIdentifiable
{
    public int Id { get; set; }
}