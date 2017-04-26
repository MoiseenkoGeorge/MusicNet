using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace MusicNet.DataAccess.Repositories.Post
{
	/// <summary>
	///     The post repository interface.
	/// </summary>
	public interface IPostRepository : IRepository<Entities.Post>
	{
		Task<IEnumerable<Entities.Post>> GetPostsByPredicateAsync(Expression<Func<Entities.Post, bool>> p, int position, int count);
	}
}