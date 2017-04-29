using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MusicNet.Common;
using MusicNet.Models;
using MusicNet.Services.Models;
using MusicNet.Services.Services.Users;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MusicNet.Controllers
{
	[Route("api/[controller]")]
	[Authorize]
	public class UsersController : Controller
	{
		private readonly IMapper _mapper;

		private readonly IUserService _userService;

		public UsersController(IUserService userService, IMapper mapper)
		{
			this._mapper = mapper;
			this._userService = userService;
		}

		[HttpGet("{name}")]
		public async Task<IActionResult> Get(string name)
		{
			Guard.ArgumentNotNullOrWhiteSpace(name, nameof(name));

			ProfileModel profileModel = await this._userService.GetProfileAsync(name);
			if (profileModel == null)
			{
				return this.BadRequest();
			}

			ProfileViewModel profileViewModel = this._mapper.Map<ProfileModel, ProfileViewModel>(profileModel);
			return this.Json(profileViewModel);
		}

	}
}