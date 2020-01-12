using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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