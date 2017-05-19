using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MusicNet.DataAccess.Repositories.Track
{
	public class TrackRepository : ITrackRepository
	{
		private readonly DbContext _context;

		public TrackRepository(DbContext context)
		{
			this._context = context;
		}

		public IEnumerable<Entities.Track> GetAll()
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<Entities.Track>> GetAllAsync()
		{
			throw new NotImplementedException();
		}

		public Entities.Track GetById(string key)
		{
			var track = this._context.Set<Entities.Track>().SingleOrDefault(t => t.Id == key);
			return track;
		}

		public async Task<Entities.Track> GetByIdAsync(string key)
		{
			var track = await this._context.Set<Entities.Track>().SingleOrDefaultAsync(t => t.Id == key);
			return track;
		}

		public Entities.Track GetByPredicate(Expression<Func<Entities.Track, bool>> p)
		{
			throw new NotImplementedException();
		}

		public Task<Entities.Track> GetByPredicateAsync(Expression<Func<Entities.Track, bool>> p)
		{
			throw new NotImplementedException();
		}

		public Entities.Track Create(Entities.Track entity)
		{
			throw new NotImplementedException();
		}

		public Task<Entities.Track> CreateAsync(Entities.Track entity)
		{
			throw new NotImplementedException();
		}

		public void Delete(string key)
		{
			throw new NotImplementedException();
		}

		public void DeleteAsync(string key)
		{
			throw new NotImplementedException();
		}

		public Entities.Track Update(Entities.Track entity)
		{
			throw new NotImplementedException();
		}

		public Task<Entities.Track> UpdateAsync(Entities.Track entity)
		{
			throw new NotImplementedException();
		}

		public async Task<IEnumerable<Entities.Track>> GetTracksByPredicateAsync(Expression<Func<Entities.Track, bool>> p, int position, int count)
		{
			var tracks = await this._context.Set<Entities.Track>().Where(p)
																.Skip(position)
																.Take(count)
																.ToListAsync();
			return tracks;
		}
	}
}