namespace SingularWebApi.Models.ViewModels
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public  class Order
    {
        #region Constructor

        public Order(Guid id, Guid clientId, Guid productId, int quantity)
        {
            Id = id;
            ClientId = clientId;
            ProductId = productId;
            Quantity = quantity;    
        }

        #endregion Constructor

        #region Properties

        [Key]
        public Guid Id { get; set; }

        public Guid ClientId { get; set; }

        public  Guid ProductId { get; set; }

        public  int Quantity { get; set; }

        public decimal Cost => (decimal) Quantity * Product?.Price ?? 0;

        #endregion Properties

        #region Navigation Properties

        [ForeignKey(nameof(ClientId))]
        public Client Client { get; set; }

        [ForeignKey(nameof(ProductId))]
        public Product Product { get; set; }

        #endregion Navigation Properties
        
        #region Methods

        public static Order New(Guid clientId, Guid productId, int quantity)
        {
            return new Order(
                id: Guid.NewGuid(),
                clientId: clientId,
                productId: productId,
                quantity: quantity
            );
        }

        #endregion Methods
    }
}
