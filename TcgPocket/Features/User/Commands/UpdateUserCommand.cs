using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Users.Commands;

public class UpdateUserCommand : IRequest<Response<UserGetDto>>
{
    public int Id { get; set; }
    public UserDto User { get; set; }
}

public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, Response<UserGetDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<UpdateUserCommand> _validator;

    public UpdateUserCommandHandler(DataContext dataContext,
        IValidator<UpdateUserCommand> validator,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
    }

    public async Task<Response<UserGetDto>> Handle(UpdateUserCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<UserGetDto> { Errors = errors };
        }

        var user = await _dataContext.Set<User>()
            .FirstOrDefaultAsync(x => x.Id == command.Id, cancellationToken);

        if (user is null) return Error.AsResponse<UserGetDto>("User not found", "id");

        _mapper.Map(command.User, user);
        await _dataContext.SaveChangesAsync(cancellationToken);

        return _mapper.Map<UserGetDto>(user).AsResponse();
    }
}