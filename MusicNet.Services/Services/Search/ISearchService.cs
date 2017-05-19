using System.Collections.Generic;
using System.Threading.Tasks;
using MusicNet.Services.Models;

namespace MusicNet.Services.Services.Search
{
	public interface ISearchService
	{
		Task<IEnumerable<TrackModel>> GetTracksByTitleAsync(string term, int posititon, int count);

		Task<IEnumerable<LightProfileModel>> GetUsersByNameAsync(string term, int position, int count);

		Task<IEnumerable<PostModel>> GetPostsAsync(string term, int position, int count);
	}
}