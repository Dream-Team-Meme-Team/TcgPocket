using MediatR;
using Newtonsoft.Json;
using TcgPocket.Features.CardReader.Dtos;
using TcgPocket.Features.StorageProvider;
using TcgPocket.Shared;

namespace TcgPocket.Features.CardReader;

public class ReadCardRequest : IRequest<Response<object>>
{
    public IFormFile Image { get; set; }
}

public class ReadCardRequestHandler : IRequestHandler<ReadCardRequest, Response<object>>
{
    private readonly IBlobStorageProvider _blobStorageProvider;
    private readonly IMachineLearningModelService _machineLearningModelService;

    public ReadCardRequestHandler(
        IBlobStorageProvider blobStorageProvider,
        IMachineLearningModelService machineLearningModelService)
    {
        _blobStorageProvider = blobStorageProvider;
        _machineLearningModelService = machineLearningModelService;
    }
    
    public async Task<Response<object>> Handle(ReadCardRequest request, CancellationToken cancellationToken)
    {
        var blobName = Guid.NewGuid().ToString();
        await _blobStorageProvider.UploadAsync(request.Image, blobName);

        var processStartInfo = _machineLearningModelService.GetProcessStartInfo(blobName);
        var result = await _machineLearningModelService.RunProcess(processStartInfo);

        if (result.HasErrors)
        {
            return new Response<object> { Errors = result.Errors };
        }

        using var client = new HttpClient();

        // Send the GET request
        var response = await client.GetAsync(result.Data.CardUri);

        // Check if the request was successful (status code 200)
        if (!response.IsSuccessStatusCode)
        {
            // If the request was not successful, handle the error
            return Error.AsResponse<object>($"Request failed with status code: {response.StatusCode}");
        }

        var responseString = await response.Content.ReadAsStringAsync(); 

        // Read and display the response content
        return ((object) JsonConvert.DeserializeObject<PokemonResponse>(responseString))!.AsResponse();
    }
}
