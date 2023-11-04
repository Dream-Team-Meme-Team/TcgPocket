namespace TcgPocket.Shared.Options;

public class OptionItemDto<T>
    where T : class
{
    public OptionItemDto(string text, string value, T meta)
    {
        Text = text;
        Value = value;
        Meta = meta;
    }
    
    public OptionItemDto(string text, string value)
    {
        Text = text;
        Value = value;
    }

    public string Text { get; set; }
    public string Value { get; set; }
    public T Meta { get; set; }
}

public class OptionItemDto
{
    public OptionItemDto(string text, string value)
    {
        Text = text;
        Value = value;
    }

    public string Text { get; set; }
    public string Value { get; set; }
}
