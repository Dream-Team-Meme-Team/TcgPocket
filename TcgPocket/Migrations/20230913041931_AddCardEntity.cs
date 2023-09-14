using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TcgPocket.Migrations
{
    /// <inheritdoc />
    public partial class AddCardEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cards",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CardNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GameId = table.Column<int>(type: "int", nullable: false),
                    CardTypeId = table.Column<int>(type: "int", nullable: false),
                    RarityId = table.Column<int>(type: "int", nullable: false),
                    SetId = table.Column<int>(type: "int", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cards_CardTypes_CardTypeId",
                        column: x => x.CardTypeId,
                        principalSchema: "dbo",
                        principalTable: "CardTypes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Cards_Games_GameId",
                        column: x => x.GameId,
                        principalSchema: "dbo",
                        principalTable: "Games",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Cards_Rarities_RarityId",
                        column: x => x.RarityId,
                        principalSchema: "dbo",
                        principalTable: "Rarities",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Cards_Sets_SetId",
                        column: x => x.SetId,
                        principalSchema: "dbo",
                        principalTable: "Sets",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cards_CardTypeId",
                schema: "dbo",
                table: "Cards",
                column: "CardTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Cards_GameId",
                schema: "dbo",
                table: "Cards",
                column: "GameId");

            migrationBuilder.CreateIndex(
                name: "IX_Cards_RarityId",
                schema: "dbo",
                table: "Cards",
                column: "RarityId");

            migrationBuilder.CreateIndex(
                name: "IX_Cards_SetId",
                schema: "dbo",
                table: "Cards",
                column: "SetId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cards",
                schema: "dbo");
        }
    }
}
