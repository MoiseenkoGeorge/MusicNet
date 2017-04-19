using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MusicNet.Common;
using MusicNet.Models;
using MusicNet.Services.Models;
using MusicNet.Services.Services.Auth;
using MusicNet.Services.Services.Users;

namespace MusicNet.Controllers
{
	[Route("api/auth")]
	public class IdentityController : Controller
	{
		private readonly IMapper _mapper;

		private readonly IUserService _userService;

		private readonly IAuthService _authService;

		public IdentityController(IMapper mapper, IUserService userService, IAuthService authService)
		{
			this._mapper = mapper;
			this._userService = userService;
			this._authService = authService;
		}

		[HttpPost("/register")]
		public async Task<IActionResult> Register([FromBody] RegisterViewModel registerViewModel)
		{
			Guard.ArgumentNotNull(registerViewModel, nameof(registerViewModel));

			if (this.ModelState.IsValid)
			{
				UserModel userModel = this._mapper.Map<RegisterViewModel, UserModel>(registerViewModel);
				UserModel registredUserModel = await this._userService.CreateUserAsync(userModel);
				if (registredUserModel == null)
				{
					this.ModelState.AddModelError("", "User with the same email has registred yet");
				}
				else
				{
					string token = this._authService.GetJwtToken(registredUserModel);
					return this.Json(
						new { AccessToken = token, UserName = userModel.Name });
				}
			}

			return this.BadRequest(this.ModelState);
		}

		[HttpPost("/login")]
		public async Task<IActionResult> Login([FromBody] LoginViewModel loginViewModel)
		{
			Guard.ArgumentNotNull(loginViewModel, nameof(loginViewModel));

			if (this.ModelState.IsValid)
			{
				UserModel userModel = this._mapper.Map<LoginViewModel, UserModel>(loginViewModel);
				UserModel signedInUserModel = await this._userService.LoginAsync(userModel);
				if (signedInUserModel == null)
				{
					this.ModelState.AddModelError("", "Incorrect Login or Password.");
				}
				else
				{
					string token = this._authService.GetJwtToken(signedInUserModel);
					return this.Json(
						new { AccessToken = token, UserName = userModel.Name });
				}
			}

			return this.BadRequest(this.ModelState);
		}
	}
}
