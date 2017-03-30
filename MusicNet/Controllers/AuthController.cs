using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace MusicNet.Controllers
{
	[Route("api/[controller]")]
	public class AuthController : Controller
	{
		// POST api/values
		[HttpPost("/token")]
		public async Task Token([FromBody]string value)
		{
			var userName = Request.Form["username"];
			var password = Request.Form["password"];


			Response.ContentType = "application/json";
			await Response.WriteAsync(JsonConvert.SerializeObject())
		}
	}


}
