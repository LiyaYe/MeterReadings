using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using MeterReadings.Models;
using MeterReadings.Models.Interfaces;

namespace MeterReadings.Data.EntityModels
{
    public class CustomerAccountEntity : ICustomerAccount
    {
        public Int32 Id { get; set; }
        [Required]
        public Int32 AccountId { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public IEnumerable<MeterReadingEntity> MeterReadings { get; set; }

        public static implicit operator CustomerAccountEntity(CustomerAccount c) => new CustomerAccountEntity()
        {
            AccountId = c.AccountId,
            FirstName = c.FirstName,
            LastName = c.LastName
        };
    }
}
