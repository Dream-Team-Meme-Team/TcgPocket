using System.Diagnostics;
using TcgPocket.Settings;

namespace TcgPocket.Features.CardReader;

public interface IMachineLearningModelService
{
    public ProcessStartInfo GetProcessStartInfo(string blobName);
    public Task<string> RunProcess(ProcessStartInfo startInfo);
}

public class MachineLearningModelService: IMachineLearningModelService
{
    private readonly ISettingsProvider _settingsProvider;

    public MachineLearningModelService(ISettingsProvider settingsProvider)
    {
        _settingsProvider = settingsProvider;
    }

    public ProcessStartInfo GetProcessStartInfo(string blobName)
    {
        var pythonSettings = _settingsProvider.GetPythonSettings();
        
        return new ProcessStartInfo
        {
            FileName = pythonSettings.Executable,
            Arguments = $"{pythonSettings.MachineLearningModel} {blobName}",
            RedirectStandardOutput = true,
            RedirectStandardInput = true,
            UseShellExecute = false,
            CreateNoWindow = true,
        };
    }

    public async Task<string> RunProcess(ProcessStartInfo startInfo)
    {
        using var process = new Process
        {
            StartInfo = startInfo
        };
        
        process.Start();
        process.StandardInput.Close();
        await process.WaitForExitAsync();

        return await process.StandardOutput.ReadToEndAsync();
    }
}