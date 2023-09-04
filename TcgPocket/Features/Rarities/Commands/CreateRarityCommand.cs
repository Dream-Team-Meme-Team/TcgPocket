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
    public class CreateRarityCommand : IRequest<Response<RarityResponseDto>>
    {
        public CreateRarityDto CreateRarityDto { get; set; }
    }

    public class CreateRarityCommandHandler : IRequestHandler<CreateRarityCommand, Response<RarityResponseDto>>
    {
        public readonly DataContext _dataContext;
        public readonly IMapper _mapper;
        public readonly IValidator<CreateRarityDto> _validator;

        public CreateRarityCommandHandler(DataContext dataContext, IMapper mapper, IValidator<CreateRarityDto> validator)
        {
            _dataContext = dataContext;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<Response<RarityResponseDto>> Handle(CreateRarityCommand command, CancellationToken cancellationToken)
        {
            var result = await _validator.ValidateAsync(command.CreateRarityDto);

            if (!result.IsValid)
            {
                var errors = _mapper.Map<List<Error>>(result.Errors);
                return new Response<RarityResponseDto> { Errors = errors };
            }

            if (!await _dataContext.Set<Game>().AnyAsync(x => x.Id == command.CreateRarityDto.GameId))
            {
                return Error.AsResponse<RarityResponseDto>("Game not found", "gameId");
            }

            var rarity = _mapper.Map<Rarity>(command.CreateRarityDto);
            await _dataContext.Set<Rarity>().AddAsync(rarity);
            await _dataContext.SaveChangesAsync();

            return _mapper.Map<RarityResponseDto>(rarity).AsResponse();
        }
    }
}
