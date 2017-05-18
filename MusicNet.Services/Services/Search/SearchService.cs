using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MusicNet.Common;
using MusicNet.DataAccess.Entities;
using MusicNet.DataAccess.UoWs;
using MusicNet.Services.Models;

namespace MusicNet.Services.Services.Search
{
	public class SearchService : ISearchService
	{
		private readonly IMapper _mapper;

		private readonly IBaseUnitOfWork _uow;

		public SearchService(IMapper mapper, IBaseUnitOfWork uow)
		{
			_mapper = mapper;
			_uow = uow;
		}

		public async Task<IEnumerable<TrackModel>> GetTracksByTitle(string term, int position, int count)
		{
			Guard.ArgumentNotNull(term, nameof(term));

			IEnumerable<Track> tracks = await this._uow.Tracks.GetTracksByPredicateAsync(track => track.Name.Contains(term) || track.Author.Contains(term));
			IEnumerable<TrackModel> trackModels = this._mapper.Map<IEnumerable<Track>, IEnumerable<TrackModel>>(tracks);

			return trackModels;
		}

		public async Task<IEnumerable<LightProfileModel>> GetUsersByName(string term, int position, int count)
		{
			Guard.ArgumentNotNull(term, nameof(term));

			IEnumerable<User> users = await this._uow.Users.GetUsersByPredicateAsync(user => user.Name.Contains(term));
			IEnumerable<LightProfileModel> lightProfileModels = this._mapper.Map<IEnumerable<User>, IEnumerable<LightProfileModel>>(users);

			return lightProfileModels;
		}

		public async Task<IEnumerable<PostModel>> GetPosts(string term, int position, int count)
		{
			Guard.ArgumentNotNull(term, nameof(term));

			IEnumerable<Post> posts = await this._uow.Posts.GetPostsByPredicateAsync(post => post.Text.Contains(term) || post.Tracks.Any(t => t.Track.Name), position, count);
		}
	}
}