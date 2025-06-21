using backend.Data;              
using backend.Models;            
using Microsoft.AspNetCore.Mvc;  
using System.Security.Claims;    
using backend.Services;
using Microsoft.EntityFrameworkCore; 
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers 
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly JwtService _jwt;

        public AuthController(AppDbContext db, JwtService jwt)
        {
            _db = db;
            _jwt = jwt;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDto request)
        {
            var exists = await _db.Users.AnyAsync(u => u.Username == request.Username);
            if (exists)
            {
                Console.WriteLine("register failed");
                return BadRequest("Username already exists");
            }

            var user = new User
            {
                Username = request.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            Console.WriteLine("register success");
            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserDto request)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Username == request.Username);
            if (user == null)
            {
                Console.WriteLine("login failed");
                return Unauthorized("Invalid credentials");
            }
            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                Console.WriteLine("login failed");
                return Unauthorized("Invalid credentials");
            }

            var token = _jwt.CreateToken(user);
            Console.WriteLine("login success");
            return Ok(new { token });
        }

        [HttpGet("users")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _db.Users
                .Select(u => new { u.Id, u.Username })
                .ToListAsync();
            return Ok(users);
        }
    }

    public record UserDto(string Username, string Password);
}

