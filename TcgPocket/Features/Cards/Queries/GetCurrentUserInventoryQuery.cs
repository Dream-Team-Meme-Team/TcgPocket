using AutoMapper;
using FluentValidation;
using TcgPocket.Data;
using TcgPocket.Features.Cards.Dtos;
using TcgPocket.Features.Cards;
using TcgPocket.Shared.Filter;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Shared.PagedResult;
using Microsoft.AspNetCore.Identity;
using TcgPocket.Features.Users;
using TcgPocket.Shared;

public class GetCurrentUserInventoryQuery : FilteredPageRequest<Card, CardDisplayDto, PagedCardFilterDto>
{
}

public class GetCurrentUserInventoryQueryHandler
    : FilteredPageRequestHandler<GetCurrentUserInventoryQuery, Card, CardDisplayDto, PagedCardFilterDto>
{
    private readonly SignInManager<User> _signInManager;
    private readonly IMapper _mapper;
    private readonly IValidator<PagedCardFilterDto> _validator;

    public GetCurrentUserInventoryQueryHandler(
        DataContext dataContext, IMapper mapper, IValidator<PagedCardFilterDto> validator, SignInManager<User> signInManager)
        : base(dataContext, mapper, validator)
    {
        _signInManager = signInManager;
        _mapper = mapper;
        _validator = validator;
    }

    protected override async Task<Response<PagedResult<CardDisplayDto>>> ValidateRequest(GetCurrentUserInventoryQuery request, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(request.Filter, cancellationToken);
        var user = await _signInManager.GetSignedInUserAsync();

        var errors = new List<Error>();
        if (!validationResult.IsValid) errors.AddRange(_mapper.Map<List<Error>>(validationResult.Errors));
        if (user is null) errors.Add(new Error { Message = "Please sign-in.", Property = "user" });

        if(errors.Any())
        {
            return new Response<PagedResult<CardDisplayDto>> { Errors = errors };
        }

        return new Response<PagedResult<CardDisplayDto>>();
    }

    protected override IQueryable<Card> GetEntities()
    {
        var user = _signInManager.GetSignedInUserAsync().Result;
        var userId = user is null ? 0 : user.Id;

        return base.GetEntities()
            .Include(x => x.CardAttributes)
            .ThenInclude(x => x.Attribute)
            .ThenInclude(x => x.CardAttributes)
            .Include(x => x.Game)
            .Include(x => x.CardType)
            .Include(x => x.Rarity)
            .Include(x => x.Set)
            .Include(x => x.UserCards
                .Where(y => y.UserId == userId));
    }
}