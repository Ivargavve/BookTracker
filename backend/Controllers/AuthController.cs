using backend.Data;              // för AppDbContext
using backend.Models;            // för User
using Microsoft.AspNetCore.Mvc;  // för [ApiController], [Route], ControllerBase
using System.Security.Claims;    // för att läsa UserId senare
using backend.Services;
using Microsoft.EntityFrameworkCore; // för EF Core metoder

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
        if (exists) return BadRequest("Username already exists");

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
        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            return Unauthorized("Invalid credentials");

        var token = _jwt.CreateToken(user);
        return Ok(new { token });
    }
}

public record UserDto(string Username, string Password);
