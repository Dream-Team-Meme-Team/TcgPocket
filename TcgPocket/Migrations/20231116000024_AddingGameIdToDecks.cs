using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TcgPocket.Migrations
{
    /// <inheritdoc />
    public partial class AddingGameIdToDecks : Migration
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

            migrationBuilder.CreateIndex(
                name: "IX_Decks_GameId",
                schema: "dbo",
                table: "Decks",
                column: "GameId");

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
