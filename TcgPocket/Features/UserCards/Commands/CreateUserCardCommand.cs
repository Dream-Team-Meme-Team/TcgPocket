using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Features.Cards;
using TcgPocket.Features.Users;
using TcgPocket.Shared;

namespace TcgPocket.Features.UserCards.Commands;

public class CreateUserCardCommand : IRequest<Response<UserCardGetDto>>
{
    public UserCardDto UserCard { get; set; }
}

public class CreateUserCardCommandHandler : IRequestHandler<CreateUserCardCommand, Response<UserCardGetDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<CreateUserCardCommand> _validator;

    public CreateUserCardCommandHandler(DataContext dataContext, IValidator<CreateUserCardCommand> validator, IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
    }

    public async Task<Response<UserCardGetDto>> Handle(CreateUserCardCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);
        var errors = new List<Error>();

        if (!validationResult.IsValid)
        {
            errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<UserCardGetDto> { Errors = errors };
        }

        if (!await _dataContext.Set<User>().AnyAsync(x => x.Id == command.UserCard.UserId, cancellationToken))
        {
            errors.Add(new Error { Message = "User not found", Property = "userId" });
        }

        if (!await _dataContext.Set<Card>().AnyAsync(x => x.Id == command.UserCard.CardId, cancellationToken))
        {
            errors.Add(new Error { Message = "Card not found", Property = "cardId" });
        }

        if(errors.Any()) return new Response<UserCardGetDto> { Errors = errors };

        var userCard = _mapper.Map<UserCard>(command.UserCard);
        await _dataContext.Set<UserCard>().AddAsync(userCard, cancellationToken);
        await _dataContext.SaveChangesAsync(cancellationToken);

        return _mapper.Map<UserCardGetDto>(userCard).AsResponse();
    }
}
