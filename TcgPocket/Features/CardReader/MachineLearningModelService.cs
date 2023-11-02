using System.Diagnostics;
using Newtonsoft.Json;
using TcgPocket.Settings;
using TcgPocket.Shared;

namespace TcgPocket.Features.CardReader;

public interface IMachineLearningModelService
{
    public ProcessStartInfo GetProcessStartInfo(string blobName);
    public Task<Response<MachineLearningModelData>> RunProcess(ProcessStartInfo startInfo);
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

    public async Task<Response<MachineLearningModelData>> RunProcess(ProcessStartInfo startInfo)
    {
        try
        {
            using var process = new Process
            {
                StartInfo = startInfo
            };

            process.Start();
            process.StandardInput.Close();
            await process.WaitForExitAsync();
            var pythonResult = await process.StandardOutput.ReadToEndAsync();

            return JsonConvert.DeserializeObject<Response<MachineLearningModelData>>(pythonResult);
        }
        catch (Exception e)
        {
            return Error.AsResponse<MachineLearningModelData>(e.Message, "shid borke");
        }
    }
}

public class MachineLearningModelData
{
    public int CardType { get; set; }
    public string CardUri { get; set; }
}

public enum CardTypes {
    Magic,
    Yugioh,
    Pokemon
}