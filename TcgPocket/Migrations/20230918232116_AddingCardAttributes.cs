using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TcgPocket.Migrations
{
    /// <inheritdoc />
    public partial class AddingCardAttributes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CardId",
                schema: "dbo",
                table: "Attributes",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "CardAttributes",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CardId = table.Column<int>(type: "int", nullable: false),
                    AttributeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CardAttributes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CardAttributes_Attributes_AttributeId",
                        column: x => x.AttributeId,
                        principalSchema: "dbo",
                        principalTable: "Attributes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CardAttributes_Cards_CardId",
                        column: x => x.CardId,
                        principalSchema: "dbo",
                        principalTable: "Cards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Attributes_CardId",
                schema: "dbo",
                table: "Attributes",
                column: "CardId");

            migrationBuilder.CreateIndex(
                name: "IX_CardAttributes_AttributeId",
                schema: "dbo",
                table: "CardAttributes",
                column: "AttributeId");

            migrationBuilder.CreateIndex(
                name: "IX_CardAttributes_CardId",
                schema: "dbo",
                table: "CardAttributes",
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attributes_Cards_CardId",
                schema: "dbo",
                table: "Attributes");

            migrationBuilder.DropTable(
                name: "CardAttributes",
                schema: "dbo");

            migrationBuilder.DropIndex(
                name: "IX_Attributes_CardId",
                schema: "dbo",
                table: "Attributes");

            migrationBuilder.DropColumn(
                name: "CardId",
                schema: "dbo",
                table: "Attributes");
        }
    }
}
