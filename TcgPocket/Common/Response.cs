namespace TcgPocket.Common;

public class Response
{
    public object Data { get; set; }
    public List<Error> Errors { get; set; } = new();
    public bool HasErrors => Errors.Any();

    public static Response Success => new();
}

public class Response<T>
{
    public T Data { get; set; }
    public List<Error> Errors { get; set; } = new();
    public bool HasErrors => Errors.Any();
}

public static class ResponseExtensions
{
    public static Response<T> AsResponse<T>(this T t)
    {
        return new Response<T> {Data = t};
    }
}