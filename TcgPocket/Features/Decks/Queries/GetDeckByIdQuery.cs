using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Decks.Queries;

public class GetDeckByIdQuery : IRequest<Response<DeckDetailDto>>
{
    public int Id { get; set; }
}

public class GetDeckByIdQueryHandler : IRequestHandler<GetDeckByIdQuery, Response<DeckDetailDto>>
{
    private readonly DataContext _dataContext;
    private readonly IValidator<GetDeckByIdQuery> _validator;
    private readonly IMapper _mapper;

    public GetDeckByIdQueryHandler(DataContext dataContext,
        IValidator<GetDeckByIdQuery> validator,
        IMapper mapper)
    {
        _dataContext = dataContext;
        _validator = validator;
        _mapper = mapper;
    }

    public async Task<Response<DeckDetailDto>> Handle(GetDeckByIdQuery query, CancellationToken cancellationToken)
    {
        var validationResult = await _validator.ValidateAsync(query, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = _mapper.Map<List<Error>>(validationResult.Errors);
            return new Response<DeckDetailDto> { Errors = errors };
        }

        var deck = await _dataContext.Set<Deck>()
            .Include(x => x.Game)
            .Include(x => x.DeckCards)
            .ThenInclude(y => y.Card)
            .FirstOrDefaultAsync(x => x.Id == query.Id, cancellationToken);

        if (deck is null) return Error.AsResponse<DeckDetailDto>("Deck not found", "id");

        return _mapper.Map<DeckDetailDto>(deck).AsResponse();
    }
}