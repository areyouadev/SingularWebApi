using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using SingularWebApi.Models.Criteria;
using SingularWebApi.Models.ViewModels;
using SingularWebApi.Data.SingularWebApi.Models;

namespace SingularWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly SingularWebApiDBContext _context;

        public OrdersController(SingularWebApiDBContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders
                    .AsNoTracking()
                    .Include(x=> x.Product)
                    .Include(x=> x.Client)
                    .ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(Guid id)
        {
            var order = await _context.Orders
                .AsNoTracking()
                .Include(x => x.Product)
                .Include(x => x.Client)
                .FirstOrDefaultAsync(x=> x.Id == id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(Guid id, UpdateOrderCriteria updateOrderCriteria)
        {
            if (updateOrderCriteria == null)
                return NotFound();

            var existingOrder = _context.Orders.FirstOrDefault(x => x.Id == id);

            if (existingOrder == null)
                return NotFound();

            existingOrder.Quantity = updateOrderCriteria.Quantity;

            _context.Entry(existingOrder).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(CreateOrderCriteria createOrderCriteria)
        {

            if (createOrderCriteria == null)
                return NotFound();

            Order order = new Order(
                id: Guid.NewGuid(),
                clientId: createOrderCriteria.ClientId,
                productId: createOrderCriteria.ProductId,
                quantity: createOrderCriteria.Quantity
            );

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.Id }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(Guid id)
        {
            var order = await _context.Orders
                .FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(Guid id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}
