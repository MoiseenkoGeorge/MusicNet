using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace MusicNet.DataAccess.Repositories.Track
{
	public interface ITrackRepository : IRepository<Entities.Track>
	{
		Task<IEnumerable<Entities.Track>> GetTracksByPredicateAsync(Expression<Func<Entities.Track, bool>> p);
	}
}