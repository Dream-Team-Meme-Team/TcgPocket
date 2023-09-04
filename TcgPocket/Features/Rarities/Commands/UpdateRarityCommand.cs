using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Features.Games;
using TcgPocket.Features.Rarities.Dtos.Requests;
using TcgPocket.Features.Rarities.Dtos.Responses;
using TcgPocket.Shared;

namespace TcgPocket.Features.Rarities.Commands
{
    public class UpdateRarityCommand : IRequest<Response<RarityResponseDto>>
    {
        public int Id { get; set; }
        public UpdateRarityDto UpdateRarityDto { get; set; }
    }

    public class UpdateRarityCommandHandler : IRequestHandler<UpdateRarityCommand, Response<RarityResponseDto>>
    {
        public readonly DataContext _dataContext;
        public readonly IMapper _mapper;
        public readonly IValidator<UpdateRarityCommand> _validator;

        public UpdateRarityCommandHandler(DataContext dataContext, IMapper mapper, IValidator<UpdateRarityCommand> validator)
        {
            _dataContext = dataContext;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<Response<RarityResponseDto>> Handle(UpdateRarityCommand command, CancellationToken cancellationToken)
        {
            var result = await _validator.ValidateAsync(command);

            if (!result.IsValid)
            {
                var errors = _mapper.Map<List<Error>>(result.Errors);
                return new Response<RarityResponseDto> { Errors = errors };
            }

            if (!await _dataContext.Set<Game>().AnyAsync(x => x.Id == command.UpdateRarityDto.GameId))
            {
                return Error.AsResponse<RarityResponseDto>("Game not found", "gameId");
            }

            var rarity = await _dataContext.Set<Rarity>().FirstOrDefaultAsync(x => x.Id == command.Id);

            if (rarity is null) return Error.AsResponse<RarityResponseDto>("Rarity not found", "id");

            _mapper.Map(command.UpdateRarityDto, rarity);
            await _dataContext.SaveChangesAsync();

            return _mapper.Map<RarityResponseDto>(rarity).AsResponse();
        }
    }
}
