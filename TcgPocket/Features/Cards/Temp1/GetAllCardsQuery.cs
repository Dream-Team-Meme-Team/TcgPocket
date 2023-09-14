using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TcgPocket.Data;
using TcgPocket.Features.Games.Commands;
using TcgPocket.Shared;

namespace TcgPocket.Features.Cards.Temp1
{
    public class GetAllCardsQuery : IRequest<Response<List<CardGetDto>>>
    {
    }

    public class GetAllCardsQueryHandler : IRequestHandler<GetAllCardsQuery, Response<List<CardGetDto>>>
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public GetAllCardsQueryHandler(DataContext dataContext,
            IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        public async Task<Response<List<CardGetDto>>> Handle(GetAllCardsQuery query, CancellationToken cancellationToken)
        {
            var cards = await _dataContext.Set<Card>().ToListAsync();

            if (cards.IsNullOrEmpty()) return Error.AsResponse<List<CardGetDto>>("Cards not found");

            return _mapper.Map<List<CardGetDto>>(cards).AsResponse();
        }
    }
}
