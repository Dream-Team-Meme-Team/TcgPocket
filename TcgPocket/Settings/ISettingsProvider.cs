using TcgPocket.Features.StorageProvider;
using TcgPocket.Shared;

namespace TcgPocket.Settings;

public interface ISettingsProvider
{
    public PythonSettings GetPythonSettings();
    public BlobSettings GetBlobSettings();
}

public class SettingsProvider : ISettingsProvider
{
    private readonly IConfiguration _configuration;

    public SettingsProvider(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    
    public PythonSettings GetPythonSettings()
    {
        return new PythonSettings
        {
            Executable = _configuration[AppSettings.PythonSettings.Executable],
            MachineLearningModel = _configuration[AppSettings.PythonSettings.MachineLearningModel]
        };
    }

    public BlobSettings GetBlobSettings()
    {
        return new BlobSettings
        {
            ConnectionString = _configuration[AppSettings.BlobSettings.ConnectionString],
            ContainerName = _configuration[AppSettings.BlobSettings.ContainerName]
        };
    }
}