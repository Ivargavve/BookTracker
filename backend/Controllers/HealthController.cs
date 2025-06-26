using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            // Simpel endpoint för att kontrollera att servern är uppe med pings
            return Ok("Server is alive!");
        }
    }
}
