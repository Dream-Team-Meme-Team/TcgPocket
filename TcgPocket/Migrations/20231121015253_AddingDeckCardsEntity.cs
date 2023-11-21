using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TcgPocket.Migrations
{
    /// <inheritdoc />
    public partial class AddingDeckCardsEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GameId",
                schema: "dbo",
                table: "Decks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "DeckCards",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DeckId = table.Column<int>(type: "int", nullable: false),
                    CardId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeckCards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DeckCards_Cards_CardId",
                        column: x => x.CardId,
                        principalSchema: "dbo",
                        principalTable: "Cards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DeckCards_Decks_DeckId",
                        column: x => x.DeckId,
                        principalSchema: "dbo",
                        principalTable: "Decks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Decks_GameId",
                schema: "dbo",
                table: "Decks",
                column: "GameId");

            migrationBuilder.CreateIndex(
                name: "IX_DeckCards_CardId",
                schema: "dbo",
                table: "DeckCards",
                column: "CardId");

            migrationBuilder.CreateIndex(
                name: "IX_DeckCards_DeckId",
                schema: "dbo",
                table: "DeckCards",
                column: "DeckId");

            migrationBuilder.AddForeignKey(
                name: "FK_Decks_Games_GameId",
                schema: "dbo",
                table: "Decks",
                column: "GameId",
                principalSchema: "dbo",
                principalTable: "Games",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Decks_Games_GameId",
                schema: "dbo",
                table: "Decks");

            migrationBuilder.DropTable(
                name: "DeckCards",
                schema: "dbo");

            migrationBuilder.DropIndex(
                name: "IX_Decks_GameId",
                schema: "dbo",
                table: "Decks");

            migrationBuilder.DropColumn(
                name: "GameId",
                schema: "dbo",
                table: "Decks");
        }
    }
}
