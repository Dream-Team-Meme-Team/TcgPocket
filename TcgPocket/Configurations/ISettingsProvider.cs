using TcgPocket.Features.StorageProvider;
using TcgPocket.Shared;

namespace TcgPocket.Configurations;

public interface ISettingsProvider
{
    public string GetPythonEnvName();
    public BlobSettings GetBlobSettings();
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

    public BlobSettings GetBlobSettings()
    {
        return _configuration.GetValue<BlobSettings>(AppSettings.BlobSettings);
    }
}