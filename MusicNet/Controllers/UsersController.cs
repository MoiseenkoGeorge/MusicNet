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
		public async Task<IActionResult> GetUserProfile(string name)
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

		[HttpGet("{userName}/followers")]
		public async Task<IActionResult> GetUserFollowers(string userName)
		{
			Guard.ArgumentNotNullOrWhiteSpace(userName, nameof(userName));

			IEnumerable<LightProfileModel> lightProfileModels = await this._userService.GetUserFollowersAsync(userName);
			IEnumerable<LightProfileViewModel> lightProfileViewModels = this._mapper.Map<IEnumerable<LightProfileModel>, IEnumerable<LightProfileViewModel>>(lightProfileModels);

			return this.Json(new {lightProfiles = lightProfileViewModels});
		}

		[HttpGet("{userName}/following")]
		public async Task<IActionResult> GetUserFollowing(string userName)
		{
			Guard.ArgumentNotNullOrWhiteSpace(userName, nameof(userName));

			IEnumerable<LightProfileModel> lightProfileModels = await this._userService.GetUserFollowingAsync(userName);
			IEnumerable<LightProfileViewModel> lightProfileViewModels = this._mapper.Map<IEnumerable<LightProfileModel>, IEnumerable<LightProfileViewModel>>(lightProfileModels);

			return this.Json(new { lightProfiles = lightProfileViewModels });
		}

		[HttpPost("{name}/following")]
		public IActionResult SubscribeToUser([FromBody] string userId)
		{
			Guard.ArgumentNotNullOrWhiteSpace(userId, nameof(userId));

			string myId = this.User.Identity.GetUserId<string>();
			this._userService.SubscribeToUser(myId, userId);

			return this.NoContent();
		}

		[HttpDelete("{name}/following")]
		public IActionResult UnsubscribeFromUser([FromBody] string userId)
		{
			Guard.ArgumentNotNullOrWhiteSpace(userId, nameof(userId));

			string myId = this.User.Identity.GetUserId<string>();
			this._userService.UnsubscribeFromUser(myId, userId);

			return this.NoContent();
		}
	}
}