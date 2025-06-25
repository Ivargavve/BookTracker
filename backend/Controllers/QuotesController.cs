using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuotesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public QuotesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/quotes
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Quote>>> GetUserQuotes()
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized();

            return await _context.Quotes
                .Where(q => q.UserId == userId)
                .ToListAsync();
        }

        // POST: api/quotes
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Quote>> CreateQuote(Quote quote)
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized();

            quote.UserId = userId.Value;
            _context.Quotes.Add(quote);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserQuotes), new { id = quote.Id }, quote);
        }

        private int? GetUserId()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            return userIdClaim != null && int.TryParse(userIdClaim.Value, out var userId) ? userId : null;
        }
    }
}
