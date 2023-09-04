using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Features.Rarities.Commands;
using TcgPocket.Features.Rarities.Dtos.Requests;
using TcgPocket.Features.Rarities.Dtos.Responses;
using TcgPocket.Shared;

namespace TcgPocket.Features.Rarities.Queries
{
    public class GetRarityByIdQuery : IRequest<Response<RarityResponseDto>>
    {
        public int Id { get; set; }
    }

    public class GetRarityByIdQueryHandler : IRequestHandler<GetRarityByIdQuery, Response<RarityResponseDto>>
    {
        public readonly DataContext _dataContext;
        public readonly IMapper _mapper;
        public readonly IValidator<GetRarityByIdQuery> _validator;

        public GetRarityByIdQueryHandler(DataContext dataContext, IMapper mapper, IValidator<GetRarityByIdQuery> validator)
        {
            _dataContext = dataContext;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<Response<RarityResponseDto>> Handle(GetRarityByIdQuery query, CancellationToken cancellationToken)
        {
            var result = await _validator.ValidateAsync(query);

            if (!result.IsValid)
            {
                var errors = _mapper.Map<List<Error>>(result.Errors);
                return new Response<RarityResponseDto> { Errors = errors };
            }

            var rarity = await _dataContext.Set<Rarity>().FirstOrDefaultAsync(x => x.Id == query.Id);

            if (rarity is null) return Error.AsResponse<RarityResponseDto>("Rarity not found", "id");

            return _mapper.Map<RarityResponseDto>(rarity).AsResponse();
        }
    }
}
