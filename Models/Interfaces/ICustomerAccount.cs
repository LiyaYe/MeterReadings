using System;

namespace MeterReadings.Models.Interfaces
{
    public interface ICustomerAccount
    {
        Int32 Id { get; set; }
        Int32 AccountId { get; set; }
        string FirstName { get; set; }
        string LastName { get; set; }
    }
}