using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TcgPocket.Migrations
{
    /// <inheritdoc />
    public partial class AddingRarity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Rarities",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GameId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rarities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rarities_Games_GameId",
                        column: x => x.GameId,
                        principalSchema: "dbo",
                        principalTable: "Games",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rarities_GameId",
                schema: "dbo",
                table: "Rarities",
                column: "GameId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Rarities",
                schema: "dbo");
        }
    }
}
