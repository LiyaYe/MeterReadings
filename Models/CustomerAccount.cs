using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using MeterReadings.Models.Interfaces;

namespace MeterReadings.Models
{
    public class CustomerAccount: ICustomerAccount
    {
        [JsonIgnore]
        public Int32 Id { get; set; }
        [Required(ErrorMessage = "Please provide an Account Id")]
        [Display(Name = "accountId")]
        public Int32 AccountId { get; set; }
        [Required(ErrorMessage = "Please provide a FirstName")]
        [Display(Name = "firstName")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "Please provide a LastName")]
        [Display(Name = "lastName")]
        public string LastName { get; set; }
    }
}
