using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MusicNet.Common;
using MusicNet.Models;
using MusicNet.Services.Models;
using MusicNet.Services.Services.Search;

namespace MusicNet.Controllers
{
	[Route("api/[controller]")]
	[Authorize]
	public class SearchController : Controller
	{
		private readonly IMapper _mapper;

		private readonly ISearchService _searchService;

		public SearchController(IMapper mapper, ISearchService searchService)
		{
			_mapper = mapper;
			_searchService = searchService;
		}

		[HttpGet("term")]
		public async Task<IActionResult> Get(string term)
		{
			Guard.ArgumentNotNull(term, nameof(term));

			IEnumerable<TrackModel> trackModels = await this._searchService.GetTracksByName(term);
			IEnumerable<TrackViewModel> trackViewModels = this._mapper.Map<IEnumerable<TrackModel>, IEnumerable<TrackViewModel>>(trackModels);

			return this.Json(new {tracks = trackViewModels});
		}
	}
}
