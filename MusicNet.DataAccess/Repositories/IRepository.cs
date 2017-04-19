using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MusicNet.DataAccess.Entities;

namespace MusicNet.DataAccess.Repositories
{
	/// <summary>
	///     The Repository interface.
	/// </summary>
	/// <typeparam name="TEntity">The entity.</typeparam>
	public interface IRepository<TEntity> where TEntity : IEntity
	{
		/// <summary>
		///     Get all entities.
		/// </summary>
		/// <returns></returns>
		IEnumerable<TEntity> GetAll();

		/// <summary>
		///     Async get all entities.
		/// </summary>
		/// <returns></returns>
		Task<IEnumerable<TEntity>> GetAllAsync();

		/// <summary>
		///     Get entity by Id.
		/// </summary>
		/// <param name="key">The key.</param>
		/// <returns>The <see cref="TEntity" /> instance.</returns>
		TEntity GetById(string key);

		/// <summary>
		///     Async get by id.
		/// </summary>
		/// <param name="key"></param>
		/// <returns></returns>
		Task<TEntity> GetByIdAsync(string key);

		/// <summary>
		///     Get entity By Predicate.
		/// </summary>
		/// <param name="p">The expression.</param>
		/// <returns>The <see cref="TEntity" /> instance.</returns>
		TEntity GetByPredicate(Expression<Func<TEntity, bool>> p);

		/// <summary>
		///     Async Get by predicate.
		/// </summary>
		/// <param name="p"></param>
		/// <returns></returns>
		Task<TEntity> GetByPredicateAsync(Expression<Func<TEntity, bool>> p);

		/// <summary>
		///     Create entity.
		/// </summary>
		/// <param name="entity">The entity.</param>
		TEntity Create(TEntity entity);

		/// <summary>
		///     Async create entity.
		/// </summary>
		/// <param name="entity">The entity.</param>
		Task<TEntity> CreateAsync(TEntity entity);

		/// <summary>
		///     Delete entity.
		/// </summary>
		/// <param name="key">The key.</param>
		void Delete(string key);

		/// <summary>
		///     Async delete entity.
		/// </summary>
		/// <param name="key">The key.</param>
		void DeleteAsync(string key);

		/// <summary>
		///     Update entity.
		/// </summary>
		/// <param name="entity">The entity.</param>
		TEntity Update(TEntity entity);

		/// <summary>
		///     Async update entity.
		///     As
		/// </summary>
		/// <param name="entity">The entity.</param>
		Task<TEntity> UpdateAsync(TEntity entity);
	}
}