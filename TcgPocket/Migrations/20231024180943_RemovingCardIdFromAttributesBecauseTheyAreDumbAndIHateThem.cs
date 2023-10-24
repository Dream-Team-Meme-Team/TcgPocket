using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TcgPocket.Migrations
{
    /// <inheritdoc />
    public partial class RemovingCardIdFromAttributesBecauseTheyAreDumbAndIHateThem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attributes_Cards_CardId",
                schema: "dbo",
                table: "Attributes");

            migrationBuilder.DropIndex(
                name: "IX_Attributes_CardId",
                schema: "dbo",
                table: "Attributes");

            migrationBuilder.DropColumn(
                name: "CardId",
                schema: "dbo",
                table: "Attributes");

            migrationBuilder.CreateTable(
                name: "UserCards",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CardId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserCards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserCards_Cards_CardId",
                        column: x => x.CardId,
                        principalSchema: "dbo",
                        principalTable: "Cards",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserCards_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "identity",
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserCards_CardId",
                schema: "dbo",
                table: "UserCards",
                column: "CardId");

            migrationBuilder.CreateIndex(
                name: "IX_UserCards_UserId",
                schema: "dbo",
                table: "UserCards",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserCards",
                schema: "dbo");

            migrationBuilder.AddColumn<int>(
                name: "CardId",
                schema: "dbo",
                table: "Attributes",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Attributes_CardId",
                schema: "dbo",
                table: "Attributes",
                column: "CardId");

            migrationBuilder.AddForeignKey(
                name: "FK_Attributes_Cards_CardId",
                schema: "dbo",
                table: "Attributes",
                column: "CardId",
                principalSchema: "dbo",
                principalTable: "Cards",
                principalColumn: "Id");
        }
    }
}
