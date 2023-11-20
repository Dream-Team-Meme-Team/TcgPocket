namespace TcgPocket.Shared.Options;

public class OptionItemDto<T>
    where T : class
{
    public OptionItemDto(string label, string value, T meta)
    {
        Label = label;
        Value = value;
        Meta = meta;
    }
    
    public OptionItemDto(string text, string value)
    {
        Label = text;
        Value = value;
    }

    public string Label { get; set; }
    public string Value { get; set; }
    public T Meta { get; set; }
}

public class OptionItemDto
{
    public OptionItemDto(string label, string value)
    {
        Label = label;
        Value = value;
    }

    public string Label { get; set; }
    public string Value { get; set; }
}
