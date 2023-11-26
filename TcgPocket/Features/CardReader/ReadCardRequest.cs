using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using TcgPocket.Data;
using TcgPocket.Features.Cards.Dtos;
using TcgPocket.Features.StorageProvider;
using TcgPocket.Features.UserCards;
using TcgPocket.Features.Users;
using TcgPocket.Shared;

namespace TcgPocket.Features.CardReader;

public class ReadCardRequest : IRequest<Response<CardDisplayDto>>
{
    public IFormFile Image { get; set; }
}

public class ReadCardRequestHandler : IRequestHandler<ReadCardRequest, Response<CardDisplayDto>>
{
    private readonly DataContext _dataContext;
    private readonly IBlobStorageProvider _blobStorageProvider;
    private readonly IMachineLearningModelService _machineLearningModelService;
    private readonly SignInManager<User> _signInManager;
    private readonly IMapper _mapper;

    public ReadCardRequestHandler(
        DataContext dataContext,
        IBlobStorageProvider blobStorageProvider,
        IMachineLearningModelService machineLearningModelService,
        SignInManager<User> signInManager,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _blobStorageProvider = blobStorageProvider;
        _machineLearningModelService = machineLearningModelService;
        _signInManager = signInManager;
        _mapper = mapper;
    }
    
    public async Task<Response<CardDisplayDto>> Handle(ReadCardRequest request, CancellationToken cancellationToken)
    {
        var currentUser = await _signInManager.GetSignedInUserAsync();

        if (currentUser is null)
        {
            return Error.AsResponse<CardDisplayDto>("Must be signed in to upload cards to your inventory");
        }
        
        var blobName = Guid.NewGuid().ToString();
        await _blobStorageProvider.UploadAsync(request.Image, blobName);

        var processStartInfo = _machineLearningModelService.GetProcessStartInfo(blobName);
        var result = await _machineLearningModelService.RunProcess(processStartInfo);
        await _blobStorageProvider.DeleteAsync(blobName);

        if (result.HasErrors)
        {
            return new Response<CardDisplayDto> { Errors = result.Errors };
        }

        var cardResponse = await _machineLearningModelService.GetCardFromData(result.Data);

        if (cardResponse.HasErrors)
        {
            return new Response<CardDisplayDto>{ Errors = cardResponse.Errors };
        }
        
        var userCardToAdd = new UserCard { User = currentUser, Card = cardResponse.Data };

        await _dataContext.Set<UserCard>().AddAsync(userCardToAdd);
        await _dataContext.SaveChangesAsync();

        return _mapper.Map<CardDisplayDto>(userCardToAdd.Card).AsResponse();
    }
}
