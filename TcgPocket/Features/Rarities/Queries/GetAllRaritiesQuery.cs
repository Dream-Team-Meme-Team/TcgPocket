using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Rarities.Queries
{
    public class GetAllRaritiesQuery : IRequest<Response<List<RarityGetDto>>>
    {
    }

    public class GetAllRaritiesQueryHandler : IRequestHandler<GetAllRaritiesQuery, Response<List<RarityGetDto>>>
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public GetAllRaritiesQueryHandler(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        public async Task<Response<List<RarityGetDto>>> Handle(GetAllRaritiesQuery query, CancellationToken cancellationToken)
        {
            return _mapper.Map<List<RarityGetDto>>(await _dataContext.Set<Rarity>().ToListAsync()).AsResponse();
        }
    }
}
