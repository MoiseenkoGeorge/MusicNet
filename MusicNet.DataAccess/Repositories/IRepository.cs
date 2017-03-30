using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace MusicNet.DataAccess.Repositories
{
	/// <summary>
	/// The Repository interface.
	/// </summary>
	/// <typeparam name="TEntity">The entity.</typeparam>
	public interface IRepository<TEntity> where TEntity : IEntity
	{
		/// <summary>
		/// Get all entities.
		/// </summary>
		/// <returns></returns>
		IEnumerable<TEntity> GetAll();

		/// <summary>
		/// Get entity by Id.
		/// </summary>
		/// <param name="key">The key.</param>
		/// <returns>The <see cref="TEntity"/> instance.</returns>
		TEntity GetById(string key);

		/// <summary>
		/// Get entity By Predicate.
		/// </summary>
		/// <param name="p">The expression.</param>
		/// <returns>The <see cref="TEntity"/> instance.</returns>
		TEntity GetByPredicate(Expression<Func<TEntity, bool>> p);

		/// <summary>
		/// Create entity.
		/// </summary>
		/// <param name="entity">The entity.</param>
		void Create(TEntity entity);

		/// <summary>
		/// Delete entity.
		/// </summary>
		/// <param name="entity">The entity.</param>
		void Delete(TEntity entity);

		/// <summary>
		/// Update entity.
		/// </summary>
		/// <param name="entity">The entity.</param>
		void Update(TEntity entity);
	}
}