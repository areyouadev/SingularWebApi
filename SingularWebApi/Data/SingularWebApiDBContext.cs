
using SingularWebApi.Models.ViewModels;
using SingularWebApi.Models.ViewModels.Enums;

namespace SingularWebApi.Data
{
    using System;
    using System.Linq;
    using System.Collections.Generic;

    using Microsoft.EntityFrameworkCore;
 

    using Models;
    
    namespace SingularWebApi.Models
    {
        public class SingularWebApiDBContext : DbContext
        {
            #region Properties

            public DbSet<Client> Clients { get; set; }
            public DbSet<Order> Orders { get; set; }
            public DbSet<Product> Products { get; set; }

            #endregion Properties

            #region Constructor

            public SingularWebApiDBContext(DbContextOptions<SingularWebApiDBContext> options)
                : base(options)
            {
                LoadInitialClients();
                LoadInitialProducts();
            }

            #endregion Constructor

            #region Methods
           
            protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                //modelBuilder.Entity<Student>()
                //    .Property(x => x.Id)
                //    .ValueGeneratedOnAdd();
            }

            public void LoadInitialProducts()
            {
                List<Product> products = new List<Product>();

                products.Add(new Product(id: Guid.NewGuid(), title:"Product 1", description:"Description Product 1", price: 1004));
                products.Add(new Product(id: Guid.NewGuid(), title: "Product 2", description:"Description Product 2", price: 400));
                products.Add(new Product(id: Guid.NewGuid(), title: "Product 3", description:"Description Product 3", price: 367));
                products.Add(new Product(id: Guid.NewGuid(), title: "Product 4", description: "Description Product 4", price: 100));
                products.Add(new Product(id: Guid.NewGuid(), title: "Product 5", description: "Description Product 5", price: 204));
                products.Add(new Product(id: Guid.NewGuid(), title: "Product 6", description: "Description Product 6", price: 305));
                products.Add(new Product(id: Guid.NewGuid(), title: "Product 7", description: "Description Product 7", price: 504));
                products.Add(new Product(id: Guid.NewGuid(), title: "Product 8", description: "Description Product 8", price: 604));
                products.Add(new Product(id: Guid.NewGuid(), title: "Product 9", description: "Description Product 9", price: 156));
                products.Add(new Product(id: Guid.NewGuid(), title: "Product 10", description: "Description Product 10", price: 1392));

                foreach (var product in products.Where(student => !this.Products.Any(x => x.Id == student.Id)))
                {
                    this.Products.Add(entity: product);

                    this.SaveChanges();
                }

                this.SaveChanges();
            }

            public void LoadInitialClients()
            {
                List<Client> clients = new List<Client>();

                clients.Add(new Client(id: Guid.NewGuid(), name: "client 1", surname: "surname 1", addressType:AddressType.Business,
                    streetAddress:"1 st Avenue", suburb:"Randburg",city:"Johannesburg",postalCode:"2169"));
                clients.Add(new Client(id: Guid.NewGuid(), name: "client 2", surname: "surname 1", addressType: AddressType.Business,
                    streetAddress: "2 st Avenue", suburb: "Northriding", city: "Johannesburg", postalCode: "2178"));
                clients.Add(new Client(id: Guid.NewGuid(), name: "client 3", surname: "surname 1", addressType: AddressType.Business,
                    streetAddress: "3 st Avenue", suburb: "Ferndale", city: "Johannesburg", postalCode: "2189"));
                clients.Add(new Client(id: Guid.NewGuid(), name: "client 4", surname: "surname 1", addressType: AddressType.Business,
                    streetAddress: "4 st Avenue", suburb: "Douglesdale", city: "Johannesburg", postalCode: "2154"));
                clients.Add(new Client(id: Guid.NewGuid(), name: "client 5", surname: "surname 1", addressType: AddressType.Business,
                    streetAddress: "5 st Avenue", suburb: "Forways", city: "Johannesburg", postalCode: "2190"));


                foreach (var client in clients.Where(student => !this.Clients.Any(x => x.Id == student.Id)))
                {
                    this.Clients.Add(entity: client);

                    this.SaveChanges();
                }

                this.SaveChanges();
            }

            #endregion Methods
        }
    }
}
