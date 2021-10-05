namespace SingularWebApi.Models.Criteria
{
    using System.ComponentModel.DataAnnotations;
    
    using ViewModels.Enums;

    public class ClientCriteria
    {
        [Required]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Name needs to be between 3 and 50 characters")]
        public string Name { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Surname needs to be between 3 and 50 characters")]
        public string Surname { get; set; }

        public AddressType AddressType { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "StreetAddress needs to be between 3 and 100 characters")]
        public string StreetAddress { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Suburb needs to be between 3 and 50 characters")]
        public string Suburb { get; set; }

        [StringLength(50, MinimumLength = 0, ErrorMessage = "City needs to be between 0 and 50 characters")]
        public string City { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 4, ErrorMessage = "Postal Code needs to be between 4 and 10 characters")]
        public string PostalCode { get; set; }
    }
}
