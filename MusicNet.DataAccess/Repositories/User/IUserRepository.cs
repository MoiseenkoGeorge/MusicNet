using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace MusicNet.DataAccess.Repositories.User
{
	/// <summary>
	///     The user repository interface.
	/// </summary>
	public interface IUserRepository : IRepository<Entities.User>
	{
		Task<IEnumerable<Entities.User>> GetUsersByPredicateAsync(Expression<Func<Entities.User, bool>> p);
	}
}