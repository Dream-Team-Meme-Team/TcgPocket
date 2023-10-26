using System.Diagnostics;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using MediatR;
using TcgPocket.Configurations;
using TcgPocket.Shared;

namespace TcgPocket.Features.CardReader;

public class ReadCardRequest : IRequest<Response<string?>>
{
    public IFormFile Image { get; set; }
}

public class ReadCardRequestHandler : IRequestHandler<ReadCardRequest, Response<string?>>
{
    private readonly ISettingsProvider _settingsProvider;

    public ReadCardRequestHandler(ISettingsProvider settingsProvider)
    {
        _settingsProvider = settingsProvider;
    }
    public async Task<Response<string?>> Handle(ReadCardRequest request, CancellationToken cancellationToken)
    {
        await using var stream = request.Image.OpenReadStream();
        
        var connectionString = "UseDevelopmentStorage=true";
        var containerName = "tcgpocketcontainer";
        var contentType = request.Image.ContentType; 
        
        var blobServiceClient = new BlobServiceClient(connectionString);
        var blobContainerClient = blobServiceClient.GetBlobContainerClient(containerName);

        await blobContainerClient.CreateIfNotExistsAsync(cancellationToken: cancellationToken);

        var blobName = Guid.NewGuid().ToString();
        var blobClient = blobContainerClient.GetBlobClient(blobName);
        var options = new BlobUploadOptions
        {
            HttpHeaders = new() {ContentType = contentType}
        };
        
        blobClient.Upload(stream, options);

        var pythonInterpreter = _settingsProvider.GetPythonEnvName();
        
        var processStartInfo = new ProcessStartInfo
        {
            FileName = pythonInterpreter,
            Arguments = $"datamodel.py {blobClient.Name}",
            RedirectStandardOutput = true,
            RedirectStandardInput = true,
            UseShellExecute = false,
            CreateNoWindow = true,
        };

        using var process = new Process();
        process.StartInfo = processStartInfo;
        process.Start();

        process.StandardInput.Close();
        
        await process.WaitForExitAsync(cancellationToken);

        var result = await process.StandardOutput.ReadToEndAsync(cancellationToken);
        
        // await blobClient.DeleteAsync(snapshotsOption: DeleteSnapshotsOption.IncludeSnapshots, cancellationToken: cancellationToken);
        
        // return JObject.Parse(result).AsResponse();
        return  result?.AsResponse();
    }
}
