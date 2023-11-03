using MediatR;
using Microsoft.AspNetCore.Mvc;
using TcgPocket.Features.CardTypes.Commands;
using TcgPocket.Features.CardTypes.Queries;
using TcgPocket.Shared;
using TcgPocket.Shared.PagedResult;
using TcgPocket.Features.CardTypes.Dtos;
using TcgPocket.Shared.Options;

namespace TcgPocket.Features.CardTypes;

[ApiController]
[Route("/api/card-types")]
public class CardTypesController : ControllerBase
{
    private readonly IMediator _mediator;

    public CardTypesController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpGet]
    public async Task<ActionResult<Response<List<CardTypeGetDto>>>> GetAllCardTypes()
    {
        var response = await _mediator.Send(new GetAllCardTypesQuery());
        
        return response.HasErrors ? BadRequest(response) : Ok(response);

    }
    
    [HttpGet("{id:int}", Name = nameof(GetCardTypeById))]
    public async Task<ActionResult<Response<CardTypeGetDto>>> GetCardTypeById([FromRoute] int id)
    {
        var response = await _mediator.Send(new GetCardTypeByIdQuery{Id = id});
        
        return response.HasErrors ? BadRequest(response) : Ok(response);
    }

    [HttpGet("paginated")]
    public async Task<ActionResult<Response<PagedResult<CardTypeGetDto>>>>
           GetAllCardTypesPaginatedQuery([FromQuery] PagedCardTypeFilterDto filter)
    {
        var response = await _mediator
            .Send(new GetPagedCardTypesQuery { Filter = filter });

        return response.HasErrors ? BadRequest(response) : Ok(response);
    }

    [HttpPost]
    public async Task<ActionResult<Response<CardTypeGetDto>>> CreateCardType([FromBody] CardTypeDto data)
    {
        var response = await _mediator.Send(new CreateCardTypeCommand{CardType = data});
        
        return response.HasErrors 
            ? BadRequest(response) 
            : CreatedAtRoute(nameof(GetCardTypeById), new { response.Data.Id },response);

    }
    
    [HttpPut("{id:int}")]
    public async Task<ActionResult<Response<CardTypeGetDto>>> UpdateCardType( [FromRoute] int id,
        [FromBody] CardTypeDto data)
    {
        var response = await _mediator.Send(new UpdateCardTypeCommand{Id = id, CardType = data});
        
        return response.HasErrors ? BadRequest(response) : Ok(response);

    }
    
    [HttpDelete("{id:int}")]
    public async Task<ActionResult<Response>> DeleteCardType([FromRoute] int id)
    {
        var response = await _mediator.Send(new DeleteCardTypeCommand{Id = id});
        
        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
    
    [HttpGet("options")]
    public async Task<ActionResult<Response<List<OptionItemDto>>>> GetOptions()
    {
        var response = await _mediator.Send(new GetCardTypeOptionsRequest
        {
            MappingExpression = x => new OptionItemDto(x.Name, x.Id.ToString())
        });
        
        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
    
    [HttpGet("options/{gameId}")]
    public async Task<ActionResult<Response<List<OptionItemDto>>>> GetOptionsByGameId(int gameId)
    {
        var response = await _mediator.Send(new GetCardTypeOptionsRequest
        {
            MappingExpression = x => new OptionItemDto(x.Name, x.Id.ToString()),
            FilterExpression = x => x.GameId == gameId
        });
        
        return response.HasErrors ? BadRequest(response) : Ok(response);
    }
}