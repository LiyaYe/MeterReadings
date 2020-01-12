using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using MeterReadings.Models.Interfaces;

namespace MeterReadings.Models
{
    public class MeterReading: IMeterReading
    {
        [JsonIgnore]
        public Int32 Id { get; set; }
        [Required(ErrorMessage = "Please provide an Account Id")]
        [Display(Name = "accountId")]
        public Int32 AccountId { get; set; }
        [Required(ErrorMessage = "Please provide a MeterRead DateTime")]
        [Display(Name = "meterReadDateTime")]
        public DateTime MeterReadDateTime { get; set; }
        [Required(ErrorMessage = "Please provide a MeterReadValue")]
        [Display(Name = "meterReadValue")]
        public string MeterReadValue { get; set; }
        [JsonIgnore]
        public ICustomerAccount CustomerAccount { get; set; }
    }
}
