using System.Collections.Generic;
using System.Threading.Tasks;
using MusicNet.Services.Models;

namespace MusicNet.Services.Services.Search
{
	public interface ISearchService
	{
		Task<IEnumerable<TrackModel>> GetTracksByName(string name);
	}
}