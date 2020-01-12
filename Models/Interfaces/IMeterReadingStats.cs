using System;

namespace MeterReadings.Models.Interfaces
{
    public interface IMeterReadingStats
    {
        int TotalCount { get; set; }
        int TotalValue { get; set; }
    }
}