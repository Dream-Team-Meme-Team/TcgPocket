using AutoMapper;
using FluentValidation;
using MediatR;
using TcgPocket.Data;
using TcgPocket.Shared;

namespace TcgPocket.Features.Cards.Commands
{
    public class CreateCardCommand : IRequest<Response<CardGetDto>>
    {
        public CardDto CardDto { get; set; }
    }

    public class CreateCardCommandHandler : IRequestHandler<CreateCardCommand, Response<CardGetDto>>
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;
        private readonly IValidator<CardDto> _validator;

        public CreateCardCommandHandler(DataContext dataContext, IMapper mapper, IValidator<CardDto> validator)
        {
            _dataContext = dataContext;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<Response<CardGetDto>> Handle(CreateCardCommand command, CancellationToken cancellationToken)
        {
            var result = await _validator.ValidateAsync(command.CardDto);

            if (!result.IsValid)
            {
                var errors = _mapper.Map<List<Error>>(result.Errors);
                return new Response<CardGetDto> { Errors = errors };
            }

            var card = _mapper.Map<Card>(command.CardDto);
            await _dataContext.Set<Card>().AddAsync(card);
            await _dataContext.SaveChangesAsync();

            return _mapper.Map<CardGetDto>(card).AsResponse();
        }
    }
}
