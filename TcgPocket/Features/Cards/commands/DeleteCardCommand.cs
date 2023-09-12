using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TcgPocket.Data;
using TcgPocket.Features.Rarities.Commands;
using TcgPocket.Shared;
using TcgPocket.Shared.Interfaces;

namespace TcgPocket.Features.Cards.Commands
{
    public class DeleteCardCommand : IIdentifiable, IRequest<Response>
    {
        public int Id { get; set; }
    }

    public class DeletCardCommandHandler : IRequestHandler<DeleteCardCommand, Response> 
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;
        private readonly IValidator<IIdentifiable> _validator;

        public DeletCardCommandHandler(DataContext dataContext, IMapper mapper, IValidator<IIdentifiable> validator)
        {
            _dataContext = dataContext;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<Response> Handle(DeleteCardCommand command, CancellationToken cancellationToken)
        {
            var result = await _validator.ValidateAsync(command);

            if (!result.IsValid)
            {
                var errors = _mapper.Map<List<Error>>(result.Errors);
                return new Response { Errors = errors };
            }

            var card = await _dataContext.Set<Card>().FirstOrDefaultAsync(x => x.Id == command.Id);

            if (card is null) return Error.AsResponse("Card not found", "id");

            _dataContext.Set<Card>().Remove(card);
            await _dataContext.SaveChangesAsync();

            return Response.Success;
        }
    }
}
