using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TcgPocket.Data;
using TcgPocket.Features.Games.Commands;
using TcgPocket.Shared;

namespace TcgPocket.Features.Cards.Queries
{
    public class GetAllCardsQuery : IRequest<Response<List<CardDetailDto>>>
    {
    }

    public class GetAllCardsQueryHandler : IRequestHandler<GetAllCardsQuery, Response<List<CardDetailDto>>>
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public GetAllCardsQueryHandler(DataContext dataContext,
            IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        public async Task<Response<List<CardDetailDto>>> Handle(GetAllCardsQuery query, CancellationToken cancellationToken)
        {
            var cards = await _dataContext.Set<Card>().Include(x => x.CardAttributes).ToListAsync();

            if (cards.IsNullOrEmpty()) return Error.AsResponse<List<CardDetailDto>>("Cards not found");

            return _mapper.Map<List<CardDetailDto>>(cards).AsResponse();
        }
    }
}
