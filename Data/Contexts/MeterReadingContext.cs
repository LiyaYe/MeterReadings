using Microsoft.EntityFrameworkCore;
using MeterReadings.Models;

namespace MeterReadings.Data.Contexts
{
    public class MeterReadingsContext : DbContext
    {
        public MeterReadingsContext(DbContextOptions<MeterReadingsContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite("Data Source=MeterReadings.db");

        public DbSet<CustomerAccount> CustomerAccount { get; set; }
        public DbSet<MeterReading> MeterReading { get; set; }

        
    }
}