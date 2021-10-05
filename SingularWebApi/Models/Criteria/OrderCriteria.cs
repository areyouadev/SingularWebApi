using System;

namespace SingularWebApi.Models.Criteria
{
    public class UpdateOrderCriteria
    {
        public int Quantity { get; set; }
    }

    public class CreateOrderCriteria
    {
        public Guid ClientId { get; set; }

        public Guid ProductId { get; set; }

        public int Quantity { get; set; }
    }
}
