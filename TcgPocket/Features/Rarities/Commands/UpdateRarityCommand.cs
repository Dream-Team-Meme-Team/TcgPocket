using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Features.Games;
using TcgPocket.Shared;

namespace TcgPocket.Features.Rarities.Commands
{
    public class UpdateRarityCommand : IRequest<Response<RarityGetDto>>
    {
        public int Id { get; set; }
        public RarityDto RarityDto { get; set; }
    }

    public class UpdateRarityCommandHandler : IRequestHandler<UpdateRarityCommand, Response<RarityGetDto>>
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;
        private readonly IValidator<UpdateRarityCommand> _validator;

        public UpdateRarityCommandHandler(DataContext dataContext, IMapper mapper, IValidator<UpdateRarityCommand> validator)
        {
            _dataContext = dataContext;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<Response<RarityGetDto>> Handle(UpdateRarityCommand command, CancellationToken cancellationToken)
        {
            var result = await _validator.ValidateAsync(command);

            if (!result.IsValid)
            {
                var errors = _mapper.Map<List<Error>>(result.Errors);
                return new Response<RarityGetDto> { Errors = errors };
            }

            if (!await _dataContext.Set<Game>().AnyAsync(x => x.Id == command.RarityDto.GameId))
            {
                return Error.AsResponse<RarityGetDto>("Game not found", "gameId");
            }

            var rarity = await _dataContext.Set<Rarity>().FirstOrDefaultAsync(x => x.Id == command.Id);

            if (rarity is null) return Error.AsResponse<RarityGetDto>("Rarity not found", "id");

            _mapper.Map(command.RarityDto, rarity);
            await _dataContext.SaveChangesAsync();

            return _mapper.Map<RarityGetDto>(rarity).AsResponse();
        }
    }
}
