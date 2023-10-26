using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using TcgPocket.Settings;

namespace TcgPocket.Features.StorageProvider;

public interface IBlobStorageProvider
{
    public void Upload(IFormFile file, string name);
    public Task UploadAsync(IFormFile file, string name);
    public void Delete(string name);
    public Task DeleteAsync(string name);
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
    
    public async Task UploadAsync(IFormFile file, string name)
    {
        await using var stream = file.OpenReadStream();
        var contentType = file.ContentType; 

        var blobClient = ContainerClient.GetBlobClient(name);
        var options = new BlobUploadOptions
        {
            HttpHeaders = new() {ContentType = contentType}
        };
        
        await blobClient.UploadAsync(stream, options);
    }

    public void Delete(string name)
    {
        var blobClient = ContainerClient.GetBlobClient(name);
        blobClient.Delete(DeleteSnapshotsOption.IncludeSnapshots);
    }
    
    public async Task DeleteAsync(string name)
    {
        var blobClient = ContainerClient.GetBlobClient(name);
        await blobClient.DeleteAsync(DeleteSnapshotsOption.IncludeSnapshots);
    }
}