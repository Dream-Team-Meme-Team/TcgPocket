using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Rarities.Queries
{
    public class GetRarityByIdQuery : IRequest<Response<RarityGetDto>>
    {
        public int Id { get; set; }
    }

    public class GetRarityByIdQueryHandler : IRequestHandler<GetRarityByIdQuery, Response<RarityGetDto>>
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;
        private readonly IValidator<GetRarityByIdQuery> _validator;

        public GetRarityByIdQueryHandler(DataContext dataContext, IMapper mapper, IValidator<GetRarityByIdQuery> validator)
        {
            _dataContext = dataContext;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<Response<RarityGetDto>> Handle(GetRarityByIdQuery query, CancellationToken cancellationToken)
        {
            var result = await _validator.ValidateAsync(query);

            if (!result.IsValid)
            {
                var errors = _mapper.Map<List<Error>>(result.Errors);
                return new Response<RarityGetDto> { Errors = errors };
            }

            var rarity = await _dataContext.Set<Rarity>().FirstOrDefaultAsync(x => x.Id == query.Id);

            if (rarity is null) return Error.AsResponse<RarityGetDto>("Rarity not found", "id");

            return _mapper.Map<RarityGetDto>(rarity).AsResponse();
        }
    }
}
