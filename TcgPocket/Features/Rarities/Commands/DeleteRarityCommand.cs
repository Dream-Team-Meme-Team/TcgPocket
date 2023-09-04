using AutoMapper;
using Azure.Core;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Rarities.Commands
{
    public class DeleteRarityCommand : IRequest<Response>
    {
        public int Id { get; set; }
    }

    public class DeleteRarityCommandHandler : IRequestHandler<DeleteRarityCommand, Response>
    {
        public readonly DataContext _dataContext;
        private readonly IMapper _mapper;
        public readonly IValidator<DeleteRarityCommand> _validator;

        public DeleteRarityCommandHandler(DataContext dataContext, IMapper mapper, IValidator<DeleteRarityCommand> validator)
        {
            _dataContext = dataContext;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<Response> Handle(DeleteRarityCommand command, CancellationToken cancellationToken)
        {
            var result = await _validator.ValidateAsync(command);

            if (!result.IsValid)
            {
                var errors = _mapper.Map<List<Error>>(result.Errors);
                return new Response { Errors = errors };
            }

            var rarity = await _dataContext.Set<Rarity>().FirstOrDefaultAsync(x => x.Id == command.Id);

            if (rarity is null) return Error.AsResponse("Rarity not found", "id");

            _dataContext.Set<Rarity>().Remove(rarity);
            await _dataContext.SaveChangesAsync();

            return Response.Success;
        }
    }
}
