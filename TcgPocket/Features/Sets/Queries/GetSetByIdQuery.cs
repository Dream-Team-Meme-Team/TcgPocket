using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Sets.Queries;

public class GetSetByIdQuery : IRequest<Response<SetGetDto>>
{
    public int Id { get; set; }
}

public class GetSetByIdQueryHandler : IRequestHandler<GetSetByIdQuery, Response<SetGetDto>>
{
    private readonly DataContext _dataContext;
    private readonly IValidator<GetSetByIdQuery> _validator;
    private readonly IMapper _mapper;

    public GetSetByIdQueryHandler(DataContext dataContext,
        IValidator<GetSetByIdQuery> validator,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _validator = validator;
        _mapper = mapper;
    }

    public async Task<Response<SetGetDto>> Handle(GetSetByIdQuery query, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(query, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<SetGetDto> { Errors = errors };
        }

        var cardType = await _dataContext.Set<Set>()
            .FirstOrDefaultAsync(x => x.Id == query.Id, cancellationToken);

        if (cardType is null) return Error.AsResponse<SetGetDto>("Card Type not found", "id");

        return _mapper.Map<SetGetDto>(cardType).AsResponse();
    }
}