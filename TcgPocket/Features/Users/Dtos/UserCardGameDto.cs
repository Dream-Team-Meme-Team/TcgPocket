﻿using TcgPocket.Shared.PagedResult;

namespace TcgPocket.Features.Users.Dtos
{
    public class UserCardGameDto : PageDto
    {
        public int UserId { get; set; }
        public int GameId { get; set; }
    }
}
