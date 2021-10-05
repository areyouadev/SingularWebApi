namespace SingularWebApi.Models.ViewModels
{
    using System;
    using System.Collections.Generic;

    using Enums;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Client
    {
        #region Constructor

        public Client(Guid id, string name, string surname, AddressType addressType, string streetAddress,
            string suburb, string city, string postalCode)
        {
            Id = id;
            Name = name;
            Surname = surname;
            AddressType = addressType;
            StreetAddress = streetAddress;
            Suburb = suburb;
            City = city;
            PostalCode = postalCode;
        }

        #endregion Constructor

        #region Properties

        [Key]
        public Guid Id { get; set; }

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

        #endregion Properties

        #region Navigation Properties

        [InverseProperty("Client")]
        public List<Order> Orders { get; set; }

        #endregion Navigation Properties

        #region Methods

        public static Client New(string name, string surname, AddressType addressType, string streetAddress,
            string suburb, string city, string postalCode)
        {
            return new Client(
                id: Guid.NewGuid(),
                name: name.Trim(),
                surname: surname.Trim(),
                addressType: addressType,
                streetAddress: streetAddress.Trim(),
                suburb: suburb.Trim(),
                city :city.Trim(),
                postalCode: postalCode
            );
        }

        #endregion Methods
    }
}
