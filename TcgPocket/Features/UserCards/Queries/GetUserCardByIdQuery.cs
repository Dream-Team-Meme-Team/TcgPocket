using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.UserCards.Queries;

public class GetUserCardByIdQuery : IRequest<Response<UserCardGetDto>>
{
    public int Id { get; set; }
}

public class GetUserCardByIdQueryHandler : IRequestHandler<GetUserCardByIdQuery, Response<UserCardGetDto>>
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IValidator<GetUserCardByIdQuery> _validator;

    public GetUserCardByIdQueryHandler(DataContext dataContext, IMapper mapper, IValidator<GetUserCardByIdQuery> validator)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _validator = validator;
    }

    public async Task<Response<UserCardGetDto>> Handle(GetUserCardByIdQuery query, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(query, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<UserCardGetDto> { Errors = errors };
        }

        var userCard = await _dataContext.Set<UserCard>().FirstOrDefaultAsync(x => x.Id == query.Id, cancellationToken);

        if (userCard is null) return Error.AsResponse<UserCardGetDto>("UserCard not found", "id");

        return _mapper.Map<UserCardGetDto>(userCard).AsResponse();
    }
}
