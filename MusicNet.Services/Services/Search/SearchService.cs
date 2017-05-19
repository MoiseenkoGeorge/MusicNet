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

		public async Task<IEnumerable<TrackModel>> GetTracksByTitleAsync(string term, int position, int count)
		{
			Guard.ArgumentNotNull(term, nameof(term));

			IEnumerable<Track> tracks = await this._uow.Tracks.GetTracksByPredicateAsync(track => track.Name.Contains(term) || track.Author.Contains(term), position, count);
			IEnumerable<TrackModel> trackModels = this._mapper.Map<IEnumerable<Track>, IEnumerable<TrackModel>>(tracks);

			return trackModels;
		}

		public async Task<IEnumerable<LightProfileModel>> GetUsersByNameAsync(string term, int position, int count)
		{
			Guard.ArgumentNotNull(term, nameof(term));

			IEnumerable<User> users = await this._uow.Users.GetUsersByPredicateAsync(user => user.Name.Contains(term), position, count);
			IEnumerable<LightProfileModel> lightProfileModels = this._mapper.Map<IEnumerable<User>, IEnumerable<LightProfileModel>>(users);

			return lightProfileModels;
		}

		public async Task<IEnumerable<PostModel>> GetPostsAsync(string term, int position, int count)
		{
			Guard.ArgumentNotNull(term, nameof(term));

			IEnumerable<Track> tracks = await this._uow.Tracks.GetTracksByPredicateAsync(track => track.Name.Contains(term) || track.Author.Contains(term) || track.Album.Contains(term), 0, 100);
			IEnumerable<string> trackIds = tracks.Select(t => t.Id);

			IEnumerable<Post> posts = await this._uow.Posts.GetPostsByPredicateAsync(post => post.Text.Contains(term) || post.Tracks.Any(t => trackIds.Contains(t.TrackId)), position, count);
			IEnumerable<PostModel> postModels = this._mapper.Map<IEnumerable<Post>, IEnumerable<PostModel>>(posts);

			return postModels;
		}
	}
}