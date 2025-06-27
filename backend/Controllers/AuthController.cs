using backend.Data;                         
using Microsoft.AspNetCore.Mvc;    
using backend.Services;
using Microsoft.EntityFrameworkCore; 
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers 
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db; // Database context for accessing user data
        private readonly JwtService _jwt; // Service for handling JWT token creation and validation

        public AuthController(AppDbContext db, JwtService jwt)
        {
            _db = db;
            _jwt = jwt;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDto request) 
        {
            var exists = await _db.Users.AnyAsync(u => u.Username == request.Username); //
            if (exists) // Check if the username already exists
            {
                return BadRequest("Username already exists");
            }

            var user = new User
            {
                Username = request.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserDto request)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Username == request.Username);
            if (user == null)
            {
                return Unauthorized("Invalid credentials");
            }
            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return Unauthorized("Invalid credentials");
            }

            var token = _jwt.CreateToken(user);
            return Ok(new { token }); // Return the JWT token upon successful login
        }

        [HttpGet("users")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUsers() // Retrieve a list of all users
        {
            var users = await _db.Users
                .Select(u => new { u.Id, u.Username })
                .ToListAsync();
            return Ok(users);
        }
    }

    public record UserDto(string Username, string Password);
}

