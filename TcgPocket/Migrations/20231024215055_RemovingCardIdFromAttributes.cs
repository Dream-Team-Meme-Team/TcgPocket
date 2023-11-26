using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TcgPocket.Migrations
{
    /// <inheritdoc />
    public partial class RemovingCardIdFromAttributes : Migration
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
        }
    }
}
