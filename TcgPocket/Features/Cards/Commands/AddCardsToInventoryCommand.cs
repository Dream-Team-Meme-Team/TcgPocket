using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared;
using TcgPocket.Features.Cards.Dtos;
using TcgPocket.Features.UserCards;
using Microsoft.AspNetCore.Identity;
using TcgPocket.Features.Users;

namespace TcgPocket.Features.Cards.Commands;

public class AddCardsToInventoryCommand : IRequest<Response<List<UserCardDto>>>
{
    public AddToInventoryDto AddToInventoryDto { get; set; }
}

public class AddCardsToInventoryCommandHandler : IRequestHandler<AddCardsToInventoryCommand, Response<List<UserCardDto>>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<AddToInventoryDto> _validator;
    private readonly SignInManager<User> _signInManager;

    public AddCardsToInventoryCommandHandler(DataContext dataContext, IMapper mapper, IValidator<AddToInventoryDto> validator, SignInManager<User> signInManager)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
        _signInManager = signInManager;
    }

    public async Task<Response<List<UserCardDto>>> Handle(AddCardsToInventoryCommand command, CancellationToken cancellationToken)
    {
        var result = await _validator.ValidateAsync(command.AddToInventoryDto);
        var user = await _signInManager.GetSignedInUserAsync();

        var errors = new List<Error>();

        if (user is null)
        {
            return Error.AsResponse<List<UserCardDto>>("Must be signed-in to upload cards to inventory.", "user");
        }

        if (!result.IsValid)
        {
            errors = _mapper.Map<List<Error>>(result.Errors);
            return new Response<List<UserCardDto>> { Errors = errors };
        }

        command.AddToInventoryDto.CardIds.ForEach(cardId =>
        {
            var cardExists = _dataContext.Set<Card>().AnyAsync(x => x.Id == cardId).Result;
            if (!cardExists)
            {
                errors.Add(new Error { Message = "Card not found", Property = "cardId" });
            }
        });

        if (errors.Any()) return new Response<List<UserCardDto>> { Errors = errors };

        var userCards = command.AddToInventoryDto.CardIds.Select(cardId => new UserCardDto
        {
            UserId = user.Id,
            CardId = cardId

        }).ToList();

        await _dataContext.Set<UserCard>().AddRangeAsync(_mapper.Map<List<UserCard>>(userCards), cancellationToken);
        await _dataContext.SaveChangesAsync();

        return userCards.AsResponse();
    }
}