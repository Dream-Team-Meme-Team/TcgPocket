using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared;
using TcgPocket.Shared.Interfaces;

namespace TcgPocket.Features.Cards.Queries
{
    public class GetCardByIdQuery : IIdentifiable, IRequest<Response<CardDetailDto>>
    {
        public int Id { get; set; }
    }

    public class GetCardByIdQueryHandler : IRequestHandler<GetCardByIdQuery, Response<CardDetailDto>>
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;
        private readonly IValidator<IIdentifiable> _validator;

        public GetCardByIdQueryHandler(DataContext dataContext, IValidator<IIdentifiable> validator, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<Response<CardDetailDto>> Handle(GetCardByIdQuery query, CancellationToken cancellationToken)
        {
            var result = await _validator.ValidateAsync(query);

            if (!result.IsValid)
            {
                var errors = _mapper.Map<List<Error>>(result.Errors);
                return new Response<CardDetailDto> { Errors = errors };
            }

            var card = await _dataContext.Set<Card>().Include(x => x.CardAttributes).FirstOrDefaultAsync(x => x.Id == query.Id);

            if (card is null) return Error.AsResponse<CardDetailDto>("Card not found", "id");

            return _mapper.Map<CardDetailDto>(card).AsResponse();
        }
    }
}
