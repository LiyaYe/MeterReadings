using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MeterReadings.Models.Interfaces;

namespace MeterReadings.Data.EntityModels
{
    public class MeterReadingEntity : IMeterReading
    {
        public Int32 Id { get; set; }
        [Required]
        [ForeignKey("CustomerAccount")]
        public Int32 AccountId { get; set; }
        [Required]
        public DateTime MeterReadDateTime { get; set; }
        [Required]
        public UInt32 MeterReadValue { get; set; }
        public CustomerAccountEntity CustomerAccount { get; set; }
    }
}
