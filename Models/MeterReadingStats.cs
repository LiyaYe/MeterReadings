using System;
using System.ComponentModel.DataAnnotations;
using MeterReadings.Models.Interfaces;

namespace MeterReadings.Models
{
    public class MeterReadingStats : IMeterReadingStats
    {
        [Display(Name = "totalCount")]
        public int TotalCount { get; set; }
        [Display(Name = "totalValue")]
        public int TotalValue { get; set; }
    }
}
