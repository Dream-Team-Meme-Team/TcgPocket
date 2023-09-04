using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Features.Rarities.Dtos.Responses;
using TcgPocket.Shared;

namespace TcgPocket.Features.Rarities.Queries
{
    public class GetAllRaritiesQuery : IRequest<Response<List<RarityResponseDto>>>
    {
    }

    public class GetAllRaritiesQueryHandler : IRequestHandler<GetAllRaritiesQuery, Response<List<RarityResponseDto>>>
    {
        public readonly DataContext _dataContext;
        public readonly IMapper _mapper;

        public GetAllRaritiesQueryHandler(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        public async Task<Response<List<RarityResponseDto>>> Handle(GetAllRaritiesQuery query, CancellationToken cancellationToken)
        {
            return _mapper.Map<List<RarityResponseDto>>(await _dataContext.Set<Rarity>().ToListAsync()).AsResponse();
        }
    }
}
