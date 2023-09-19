using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Features.Cards;
using TcgPocket.Features.Users;
using TcgPocket.Shared;

namespace TcgPocket.Features.UserCards.Commands;

public class UpdateUserCardCommand : IRequest<Response<UserCardGetDto>>
{
    public int Id { get; set; }
    public UserCardDto UserCard { get; set; }
}

public class UpdateUserCardCommandHandler : IRequestHandler<UpdateUserCardCommand, Response<UserCardGetDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<UpdateUserCardCommand> _validator;

    public UpdateUserCardCommandHandler(DataContext dataContext, 
        IMapper mapper, 
        IValidator<UpdateUserCardCommand> validator)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
    }

    public async Task<Response<UserCardGetDto>> Handle(UpdateUserCardCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);
        var errors = new List<Error>();

        if (!validationResult.IsValid)
        {
            _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<UserCardGetDto> { Errors = errors };
        }

        if(!await _dataContext.Set<User>().AnyAsync(x => x.Id == command.UserCard.UserId, cancellationToken))
        {
            errors.Add(new Error { Message = "User not found", Property = "userId" });
        }

        if (!await _dataContext.Set<Card>().AnyAsync(x => x.Id == command.UserCard.CardId, cancellationToken))
        {
            errors.Add(new Error { Message = "Card not found", Property = "cardId" });
        }

        var userCard = await _dataContext.Set<UserCard>()
            .FirstOrDefaultAsync(x => x.Id == command.Id, cancellationToken);

        if (userCard is null)
        {
            errors.Add(new Error { Message = "UserCard not found", Property = "id" });
        }

        if (errors.Any()) return new Response<UserCardGetDto> { Errors = errors };

        _mapper.Map(command.UserCard, userCard);
        await _dataContext.SaveChangesAsync(cancellationToken);

        return _mapper.Map<UserCardGetDto>(userCard).AsResponse();
    }

}

