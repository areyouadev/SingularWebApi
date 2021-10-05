using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SingularWebApi.Models.Criteria
{
    public class ProductCriteria
    {
        [Required]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Title needs to be between 3 and 50 characters")]
        public string Title { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Description needs to be between 3 and 100 characters")]
        public string Description { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Only positive price allowed")]
        public decimal Price { get; set; }
    }
}
