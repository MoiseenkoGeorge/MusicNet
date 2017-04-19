using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MusicNet.DataAccess.Repositories.User
{
	/// <summary>
	///     The User Repository.
	/// </summary>
	public class UserRepository : IUserRepository
	{
		private readonly DbContext _context;

		public UserRepository(DbContext context)
		{
			this._context = context;
		}

		public IEnumerable<Entities.User> GetAll()
		{
			IEnumerable<Entities.User> users = this._context.Set<Entities.User>();
			return users;
		}

		public Task<IEnumerable<Entities.User>> GetAllAsync()
		{
			return Task.Run(() => this.GetAll());
		}

		public Entities.User GetById(string key)
		{
			var user = this._context.Set<Entities.User>().SingleOrDefault(u => u.Id == key);
			return user;
		}

		public async Task<Entities.User> GetByIdAsync(string key)
		{
			var user = await this._context.Set<Entities.User>().SingleOrDefaultAsync(u => u.Id == key);
			return user;
		}

		public Entities.User GetByPredicate(Expression<Func<Entities.User, bool>> p)
		{
			var user = this._context.Set<Entities.User>().SingleOrDefault(p);
			return user;
		}

		public async Task<Entities.User> GetByPredicateAsync(Expression<Func<Entities.User, bool>> p)
		{
			var user = await this._context.Set<Entities.User>().SingleOrDefaultAsync(p);
			return user;
		}

		public Entities.User Create(Entities.User entity)
		{
			entity.CreationDate = DateTime.Now;
			var result = this._context.Set<Entities.User>().Add(entity);
			return result.Entity;
		}

		public async Task<Entities.User> CreateAsync(Entities.User entity)
		{
			entity.CreationDate = DateTime.Now;
			var result = await this._context.Set<Entities.User>().AddAsync(entity);
			return result.Entity;
		}

		public void Delete(string key)
		{
			var user = this._context.Set<Entities.User>().SingleOrDefault(u => u.Id == key);
			if (user != null)
				this._context.Set<Entities.User>().Remove(user);
		}

		public async void DeleteAsync(string key)
		{
			var user = await this._context.Set<Entities.User>().SingleOrDefaultAsync(u => u.Id == key);
			if (user != null)
				this._context.Set<Entities.User>().Remove(user);
		}

		public Entities.User Update(Entities.User entity)
		{
			throw new NotImplementedException();
		}

		public Task<Entities.User> UpdateAsync(Entities.User entity)
		{
			throw new NotImplementedException();
		}
	}
}