using Microsoft.EntityFrameworkCore;
using MeterReadings.Data.EntityModels;

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

        public DbSet<CustomerAccountEntity> CustomerAccounts { get; set; }
        public DbSet<MeterReadingEntity> MeterReadings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MeterReadingEntity>()
                .HasAlternateKey(m => new { m.MeterReadDateTime, m.AccountId });

            modelBuilder.Entity<CustomerAccountEntity>()
                .HasIndex(ca => ca.AccountId)
                .IsUnique();

            modelBuilder.Entity<MeterReadingEntity>()
                .HasOne(m => m.CustomerAccount)
                .WithMany(ca => ca.MeterReadings)
                .HasForeignKey(m => m.AccountId)
                .HasPrincipalKey(ca => ca.AccountId);
        }
    }
}