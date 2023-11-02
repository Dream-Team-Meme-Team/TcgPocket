using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TcgPocket.Data;
using TcgPocket.Features.Sets;

namespace TcgPocket.Shared.Options
{
    public class GetOptionsRequest : IRequest<Response<List<OptionItemDto>>>
    {
        public static int gameId => 1;
        public Expression<Func<Set, OptionItemDto>> MappingExpression = x => new OptionItemDto(x.Name, x.Id.ToString());
        public Expression<Func<Set, bool>> FilterExpression = x => x.GameId == gameId;
    }

    public class GetOptionsRequestHandler : IRequestHandler<GetOptionsRequest, Response<List<OptionItemDto>>>
    {
        private readonly DataContext _dataContext;

        public GetOptionsRequestHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public Task<Response<List<OptionItemDto>>> Handle(GetOptionsRequest request, CancellationToken _)
        {
            var query = GetEntities();
            query = FilterEntities(query, request);
            var optionsQuery = MapEntities(query, request);

            return optionsQuery
                .ToList()
                .AsResponse();
        }

        protected virtual IQueryable<Set> GetEntities()
        {
            return _dataContext.Set<Set>();
        }

        protected virtual IQueryable<Set> FilterEntities(IQueryable<Set> query, GetOptionsRequest request)
        {
            return query.Where(request.FilterExpression);
        }

        protected virtual IQueryable<OptionItemDto> MapEntities(IQueryable<Set> query, GetOptionsRequest request)
        {
            return query.Select(request.MappingExpression);
        }
    }
}
