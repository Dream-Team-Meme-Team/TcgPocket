using AutoMapper;
using FluentValidation;
using MediatR;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Users.Commands;

public class CreateUserCommand : IRequest<Response<UserGetDto>>
{
    public UserDto User { get; set; }
}

public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, Response<UserGetDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<CreateUserCommand> _validator;

    public CreateUserCommandHandler(DataContext dataContext,
        IValidator<CreateUserCommand> validator,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
    }

    public async Task<Response<UserGetDto>> Handle(CreateUserCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(command, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<UserGetDto> { Errors = errors };
        }

        var user = _mapper.Map<User>(command.User);
        await _dataContext.Set<User>().AddAsync(user, cancellationToken);
        await _dataContext.SaveChangesAsync(cancellationToken);

        return _mapper.Map<UserGetDto>(user).AsResponse();
    }
}