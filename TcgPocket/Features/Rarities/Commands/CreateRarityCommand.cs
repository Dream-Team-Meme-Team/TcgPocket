using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Features.Games;
using TcgPocket.Shared;

namespace TcgPocket.Features.Rarities.Commands
{
    public class CreateRarityCommand : IRequest<Response<RarityGetDto>>
    {
        public RarityDto RarityDto { get; set; }
    }

    public class CreateRarityCommandHandler : IRequestHandler<CreateRarityCommand, Response<RarityGetDto>>
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;
        private readonly IValidator<RarityDto> _validator;

        public CreateRarityCommandHandler(DataContext dataContext, IMapper mapper, IValidator<RarityDto> validator)
        {
            _dataContext = dataContext;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<Response<RarityGetDto>> Handle(CreateRarityCommand command, CancellationToken cancellationToken)
        {
            var result = await _validator.ValidateAsync(command.RarityDto);

            if (!result.IsValid)
            {
                var errors = _mapper.Map<List<Error>>(result.Errors);
                return new Response<RarityGetDto> { Errors = errors };
            }

            if (!await _dataContext.Set<Game>().AnyAsync(x => x.Id == command.RarityDto.GameId))
            {
                return Error.AsResponse<RarityGetDto>("Game not found", "gameId");
            }

            var rarity = _mapper.Map<Rarity>(command.RarityDto);
            await _dataContext.Set<Rarity>().AddAsync(rarity);
            await _dataContext.SaveChangesAsync();

            return _mapper.Map<RarityGetDto>(rarity).AsResponse();
        }
    }
}
