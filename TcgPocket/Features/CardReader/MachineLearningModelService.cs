using System.Diagnostics;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using TcgPocket.Data;
using TcgPocket.Features.CardReader.Dtos;
using TcgPocket.Features.Cards;
using TcgPocket.Settings;
using TcgPocket.Shared;

namespace TcgPocket.Features.CardReader;

public interface IMachineLearningModelService
{
    public ProcessStartInfo GetProcessStartInfo(string blobName);
    public Task<Response<MachineLearningModelData>> RunProcess(ProcessStartInfo startInfo);
    public Task<Response<Card>> GetCardFromData(MachineLearningModelData data);
}

public class MachineLearningModelService: IMachineLearningModelService
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly ISettingsProvider _settingsProvider;

    public MachineLearningModelService(DataContext dataContext,
        ISettingsProvider settingsProvider,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
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
            using var process = new Process();
            process.StartInfo = startInfo;

            process.Start();
            process.StandardInput.Close();
            await process.WaitForExitAsync();
            var pythonResult = await process.StandardOutput.ReadToEndAsync();

            return JsonConvert.DeserializeObject<Response<MachineLearningModelData>>(pythonResult)!;
        }
        catch (Exception e)
        {
            return Error.AsResponse<MachineLearningModelData>(e.Message);
        }
    }

    public async Task<Response<Card>> GetCardFromData(MachineLearningModelData data)
    {
        using var client = new HttpClient();
        var response = await client.GetAsync(data.CardUri);

        if (!response.IsSuccessStatusCode)
        {
            return Error.AsResponse<Card>($"Request failed with status code: {response.StatusCode}");
        }

        var responseString = await response.Content.ReadAsStringAsync();
        
        var cardResponse = data.CardType switch
        {
            0 => GetMagicCard(responseString),
            1 => GetYugiohCard(responseString),
            2 => GetPokemonCard(responseString),
            _ => Error.AsResponse<ExternalCardFilterDto>("Could not classify card")
        };

        if (cardResponse.HasErrors)
        {
            return new Response<Card> { Errors = cardResponse.Errors};
        }

        var cardFilter = cardResponse.Data;
        
        var card = await _dataContext.Set<Card>()
            .FirstOrDefaultAsync(x => x.Name.ToLower() == cardFilter.Name.ToLower()
                && x.CardNumber.ToLower() == cardFilter.CardNumber.ToLower()
                && x.Game.Name == cardFilter.GameName
                && x.Set.Name.ToLower() == cardFilter.SetName.ToLower());

        return card is null 
            ? Error.AsResponse<Card>("Could not find card")
            : card.AsResponse();
    }

    private Response<ExternalCardFilterDto> GetMagicCard(string responseString)
    {
        var magicCardResponse = JsonConvert.DeserializeObject<MagicResponse>(responseString);
        var magicCard = magicCardResponse!.Data.FirstOrDefault();
        
        return magicCard is null
            ? Error.AsResponse<ExternalCardFilterDto>("Could not deserialize response")
            : _mapper.Map<ExternalCardFilterDto>(magicCard).AsResponse();
    }
    
    private Response<ExternalCardFilterDto> GetYugiohCard(string responseString)
    {
        var yugiohCard = JsonConvert.DeserializeObject<YugiohData>(responseString);
        
        return yugiohCard is null
            ? Error.AsResponse<ExternalCardFilterDto>("Could not deserialize response")
            : _mapper.Map<ExternalCardFilterDto>(yugiohCard).AsResponse();
    }
    
    private Response<ExternalCardFilterDto> GetPokemonCard(string responseString)
    {
        var pokemonCardResponse = JsonConvert.DeserializeObject<PokemonResponse>(responseString);
        var pokemonCard = pokemonCardResponse!.Data.FirstOrDefault();
        
        return pokemonCard is null
            ? Error.AsResponse<ExternalCardFilterDto>("Could not deserialize response")
            : _mapper.Map<ExternalCardFilterDto>(pokemonCard).AsResponse();
    }
}

public class MachineLearningModelData
{
    public int CardType { get; set; }
    public string CardUri { get; set; }
}

public class ExternalCardFilterDto
{
    public string Name { get; set; }
    public string GameName { get; set; }
    public string SetName { get; set; }
    public string CardNumber { get; set; }
}