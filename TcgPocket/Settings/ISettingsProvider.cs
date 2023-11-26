namespace TcgPocket.Settings;

public interface ISettingsProvider
{
}

public class SettingsProvider : ISettingsProvider
{
    private readonly IConfiguration _configuration;

    public SettingsProvider(IConfiguration configuration)
    {
        _configuration = configuration;
    }
}