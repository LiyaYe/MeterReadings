using System;
namespace MeterReadings.Models.Interfaces
{
    public interface IMeterReading
    {
        Int32 Id { get; set; }
        Int32 AccountId { get; set; }
        DateTime MeterReadDateTime { get; set; }
        string MeterReadValue { get; set; }
    }
}