using MediatR;
using Microsoft.AspNetCore.Mvc;
using TcgPocket.Common;
using TcgPocket.Features.CardTypes;

namespace TcgPocket.Controllers;

[ApiController]
[Route("/card-types")]
public class CardTypesController : ControllerBase
{
    private readonly IMediator _mediator;

    public CardTypesController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpGet]
    public async Task<Response<List<CardTypeDto>>> GetAllCardTypes([FromQuery] GetAllCardTypesQuery query)
    {
        return await _mediator.Send(query);
    }
    
    [HttpGet("{id:int}")]
    public async Task<Response<CardTypeDto>> GetCardTypeById([FromRoute] int id)
    {
        return await _mediator.Send(new GetCardTypeByIdQuery{Id = id});
    }
    
    [HttpPost]
    public async Task<Response<CardTypeDto>> CreateCardType([FromBody] CreateCardTypeCommand command)
    {
        return await _mediator.Send(command);
    }
    
    [HttpPut("{id:int}")]
    public async Task<Response<CardTypeDto>> UpdateCardType( [FromRoute] int id,
        [FromBody] UpdateCardTypeCommand command)
    {
        command.Id = id;
        return await _mediator.Send(command);
    }
    
    [HttpDelete("{id:int}")]
    public async Task<Response> DeleteCardType([FromRoute] int id)
    {
        return await _mediator.Send(new DeleteCardTypeCommand{Id = id});
    }
}