using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MusicNet.Common;
using MusicNet.Infrastructure.Extensions;
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
		public async Task<IActionResult> GetUserProfileAsync(string name)
		{
			Guard.ArgumentNotNullOrWhiteSpace(name, nameof(name));

			string myId = this.User.Identity.GetUserId<string>();
			ProfileModel profileModel = await this._userService.GetProfileAsync(name, myId);
			if (profileModel == null)
			{
				return this.BadRequest();
			}

			ProfileViewModel profileViewModel = this._mapper.Map<ProfileModel, ProfileViewModel>(profileModel);
			return this.Json(profileViewModel);
		}

		[HttpGet("{userName}/followers")]
		public async Task<IActionResult> GetUserFollowersAsync(string userName)
		{
			Guard.ArgumentNotNullOrWhiteSpace(userName, nameof(userName));

			string myId = this.User.Identity.GetUserId<string>();
			IEnumerable<LightProfileModel> lightProfileModels = await this._userService.GetUserFollowersAsync(userName, myId);
			IEnumerable<LightProfileViewModel> lightProfileViewModels = this._mapper.Map<IEnumerable<LightProfileModel>, IEnumerable<LightProfileViewModel>>(lightProfileModels);

			return this.Json(new {profiles = lightProfileViewModels});
		}

		[HttpGet("{userName}/following")]
		public async Task<IActionResult> GetUserFollowingAsync(string userName)
		{
			Guard.ArgumentNotNullOrWhiteSpace(userName, nameof(userName));

			string myId = this.User.Identity.GetUserId<string>();
			IEnumerable<LightProfileModel> lightProfileModels = await this._userService.GetUserFollowingAsync(userName, myId);
			IEnumerable<LightProfileViewModel> lightProfileViewModels = this._mapper.Map<IEnumerable<LightProfileModel>, IEnumerable<LightProfileViewModel>>(lightProfileModels);

			return this.Json(new { profiles = lightProfileViewModels });
		}

		[HttpPost("{userName}/following")]
		public async Task<IActionResult> SubscribeToUserAsync(string userName)
		{
			Guard.ArgumentNotNullOrWhiteSpace(userName, nameof(userName));

			string myId = this.User.Identity.GetUserId<string>();
			await this._userService.SubscribeToUserAsync(myId, userName);

			return this.NoContent();
		}

		[HttpDelete("{userName}/following")]
		public async Task<IActionResult> UnsubscribeFromUserAsync(string userName)
		{
			Guard.ArgumentNotNullOrWhiteSpace(userName, nameof(userName));

			string myId = this.User.Identity.GetUserId<string>();
			await this._userService.UnsubscribeFromUserAsync(myId, userName);

			return this.NoContent();
		}
	}
}