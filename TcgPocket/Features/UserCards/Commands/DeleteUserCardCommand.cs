using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.UserCards.Commands;

public class DeleteUserCardCommand : IRequest<Response>
{
    public int Id { get; set; }
}

public class DeleteUserCardCommandHandler : IRequestHandler<DeleteUserCardCommand, Response>
{
    private readonly DataContext _dataContext;
    private readonly IValidator<DeleteUserCardCommand> _validator;
    private readonly IMapper _mapper;
    public DeleteUserCardCommandHandler (DataContext dataContext, 
        IValidator<DeleteUserCardCommand> validator,
        IMapper mapper)
	{
        _dataContext = dataContext;
        _validator = validator;
        _mapper = mapper;
	}

    public async Task<Response> Handle(DeleteUserCardCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response { Errors = errors };
        }

        var userCard = await _dataContext.Set<UserCard>()
            .FirstOrDefaultAsync(x => x.Id == command.Id, cancellationToken);

        if (userCard is null) return Error.AsResponse("UserCard not found", "id");

        _dataContext.Set<UserCard>().Remove(userCard);
        await _dataContext.SaveChangesAsync(cancellationToken);

        return Response.Success;
    }
}
