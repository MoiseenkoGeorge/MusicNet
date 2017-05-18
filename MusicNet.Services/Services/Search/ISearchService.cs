using System.Collections.Generic;
using System.Threading.Tasks;
using MusicNet.Services.Models;

namespace MusicNet.Services.Services.Search
{
	public interface ISearchService
	{
		Task<IEnumerable<TrackModel>> GetTracksByTitle(string term, int posititon, int count);

		Task<IEnumerable<LightProfileModel>> GetUsersByName(string term, int position, int count);

		Task<IEnumerable<PostModel>> GetPosts(string term, int position, int count);
	}
}