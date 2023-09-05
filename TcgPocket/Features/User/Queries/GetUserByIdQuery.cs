using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Users.Queries;

public class GetUserByIdQuery : IRequest<Response<UserGetDto>>
{
    public int Id { get; set; }
}

public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, Response<UserGetDto>>
{
    private readonly DataContext _dataContext;
    private readonly IValidator<GetUserByIdQuery> _validator;
    private readonly IMapper _mapper;

    public GetUserByIdQueryHandler(DataContext dataContext,
        IValidator<GetUserByIdQuery> validator,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _validator = validator;
        _mapper = mapper;
    }

    public async Task<Response<UserGetDto>> Handle(GetUserByIdQuery query, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(query, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<UserGetDto> { Errors = errors };
        }

        var user = await _dataContext.Set<User>()
            .FirstOrDefaultAsync(x => x.Id == query.Id, cancellationToken);

        if (user is null) return Error.AsResponse<UserGetDto>("User not found", "id");

        return _mapper.Map<UserGetDto>(user).AsResponse();
    }
}