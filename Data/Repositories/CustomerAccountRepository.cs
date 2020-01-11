namespace MeterReadings.Data.Contexts
{
    public class CustomerAccountRepository
    {
        private readonly MeterReadingsContext _context;
        public CustomerAccountRepository(MeterReadingsContext context) {
            _context = context;
        }
    }
}