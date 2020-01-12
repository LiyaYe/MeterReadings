using Microsoft.EntityFrameworkCore.Migrations;

namespace MeterReadings.Migrations
{
    public partial class customerAccountIdUnique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_CustomerAccounts_AccountId",
                table: "CustomerAccounts",
                column: "AccountId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CustomerAccounts_AccountId",
                table: "CustomerAccounts");
        }
    }
}
