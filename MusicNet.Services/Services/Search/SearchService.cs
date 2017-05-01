using System.Collections.Generic;
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

		public async Task<IEnumerable<TrackModel>> GetTracksByName(string name)
		{
			Guard.ArgumentNotNull(name, nameof(name));

			IEnumerable<Track> tracks = await this._uow.Tracks.GetTracksByPredicateAsync(track => track.Name.Contains(name) || track.Author.Contains(name));
			IEnumerable<TrackModel> trackModels = this._mapper.Map<IEnumerable<Track>, IEnumerable<TrackModel>>(tracks);

			return trackModels;
		}
	}
}