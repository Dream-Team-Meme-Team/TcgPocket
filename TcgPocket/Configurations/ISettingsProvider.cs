using TcgPocket.Shared;

namespace TcgPocket.Configurations;

public interface ISettingsProvider
{
    public string GetPythonEnvName();
}

public class SettingsProvider : ISettingsProvider
{
    private readonly IConfiguration _configuration;

    public SettingsProvider(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    
    public string GetPythonEnvName()
    {
        return _configuration[AppSettings.PythonEnvName];
    }
}