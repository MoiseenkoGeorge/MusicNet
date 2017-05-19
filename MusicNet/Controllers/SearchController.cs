using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MusicNet.Common;
using MusicNet.Models;
using MusicNet.Services.Models;
using MusicNet.Services.Services.Search;

namespace MusicNet.Controllers
{
	[Route("api/search")]
	public class SearchController : Controller
	{
		private readonly IMapper _mapper;

		private readonly ISearchService _searchService;

		public SearchController(IMapper mapper, ISearchService searchService)
		{
			_mapper = mapper;
			_searchService = searchService;
		}

		[HttpGet("tracks")]
		public async Task<IActionResult> GetTracks([FromQuery]string term)
		{
			Guard.ArgumentNotNull(term, nameof(term));

			IEnumerable<TrackModel> trackModels = await this._searchService.GetTracksByTitleAsync(term, 0, 20);
			IEnumerable<TrackViewModel> trackViewModels = this._mapper.Map<IEnumerable<TrackModel>, IEnumerable<TrackViewModel>>(trackModels);

			return this.Json(new {tracks = trackViewModels});
		}

		[HttpGet("users")]
		public async Task<IActionResult> GetUsers([FromQuery] string term)
		{
			Guard.ArgumentNotNull(term, nameof(term));

			IEnumerable<LightProfileModel> profileModels = await this._searchService.GetUsersByNameAsync(term, 0, 20);
			IEnumerable<LightProfileViewModel> profileViewModels = this._mapper.Map<IEnumerable<LightProfileModel>, IEnumerable<LightProfileViewModel>>(profileModels);

			return this.Json(new { users = profileViewModels });
		}

		[HttpGet("posts")]
		public async Task<IActionResult> GetPosts([FromQuery] string term)
		{
			Guard.ArgumentNotNull(term, nameof(term));

			IEnumerable<PostModel> postModels = await this._searchService.GetPostsAsync(term, 0, 20);
			IEnumerable<PostViewModel> postViewModels = this._mapper.Map<IEnumerable<PostModel>, IEnumerable<PostViewModel>>(postModels);

			return this.Json(new { posts = postViewModels });
		}
	}
}
