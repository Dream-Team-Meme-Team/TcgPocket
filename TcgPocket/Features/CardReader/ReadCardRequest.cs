using MediatR;
using TcgPocket.Features.StorageProvider;
using TcgPocket.Shared;

namespace TcgPocket.Features.CardReader;

public class ReadCardRequest : IRequest<Response<string>>
{
    public IFormFile Image { get; set; }
}

public class ReadCardRequestHandler : IRequestHandler<ReadCardRequest, Response<string>>
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
    
    public async Task<Response<string>> Handle(ReadCardRequest request, CancellationToken cancellationToken)
    {
        var blobName = Guid.NewGuid().ToString();
        await _blobStorageProvider.UploadAsync(request.Image, blobName);

        var processStartInfo = _machineLearningModelService.GetProcessStartInfo(blobName);
        var result = await _machineLearningModelService.RunProcess(processStartInfo);
        
        return  result.AsResponse();
    }
}
