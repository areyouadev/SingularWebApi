namespace SingularWebApi.Models.ViewModels
{
    using System;
    using System.Collections.Generic;

    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Product
    {
        #region Contructor

        public Product(Guid id, string title, string description, decimal price)
        {
            Id = id;
            Title = title;
            Description = description;
            Price = price;  
        }

        #endregion Contructor

        #region Properties

        [Key]
        public Guid Id { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Title needs to be between 3 and 50 characters")]
        public string Title { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Description needs to be between 3 and 100 characters")]
        public string Description { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Only positive price allowed")]
        public decimal Price { get; set; }

        #endregion Properties

        #region Navigation Properties

        [InverseProperty("Product")]
        public List<Order> Orders { get; set; }

        #endregion Navigation Properties

        #region Methods

        public static Product New(string title, string description, decimal price)
        {
            return new Product(
                id: Guid.NewGuid(),
                title: title.Trim(),
                description: description.Trim(),
                price: price
            );
        }

        #endregion Methods

    }
}
