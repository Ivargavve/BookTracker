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
            // Simple health check endpoint
            // This can be used to check if the server is running
            // and responding to requests.
            return Ok("Server is alive!");
        }
    }
}
