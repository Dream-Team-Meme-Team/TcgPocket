using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using TcgPocket.Configurations;

namespace TcgPocket.Features.StorageProvider;

public interface IBlobStorageProvider
{
    
}

public class BlobStorageProvider : IBlobStorageProvider
{
    public BlobServiceClient ServiceClient { get; set; }
    public BlobContainerClient ContainerClient { get; set; }
    
    public BlobStorageProvider(ISettingsProvider settingsProvider)
    {
        var blobSettings = settingsProvider.GetBlobSettings();
        
        ServiceClient = new BlobServiceClient(blobSettings.ConnectionString);
        ContainerClient = ServiceClient.GetBlobContainerClient(blobSettings.ContainerName);
        
        ContainerClient.CreateIfNotExistsAsync();
    }

    public void Upload(IFormFile file, string name)
    {
        using var stream = file.OpenReadStream();
        var contentType = file.ContentType; 

        var blobClient = ContainerClient.GetBlobClient(name);
        var options = new BlobUploadOptions
        {
            HttpHeaders = new() {ContentType = contentType}
        };
        
        blobClient.Upload(stream, options);
    }
}