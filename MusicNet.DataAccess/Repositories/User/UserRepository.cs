using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MusicNet.DataAccess.Repositories.User
{
	/// <summary>
	/// The User Repository.
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
			Entities.User user = this._context.Set<Entities.User>().SingleOrDefault(u => u.Id == key);
			return user;
		}

		public Task<Entities.User> GetByIdAsync(string key)
		{
			return Task.Run(() => this.GetById(key));
		}

		public Entities.User GetByPredicate(Expression<Func<Entities.User, bool>> p)
		{
			Entities.User user = this._context.Set<Entities.User>().SingleOrDefault(p.Compile());
			return user;
		}

		public Task<Entities.User> GetByPredicateAsync(Expression<Func<Entities.User, bool>> p)
		{
			return Task.Run(() => this.GetByPredicate(p));
		}

		public Entities.User Create(Entities.User entity)
		{
			var result = this._context.Set<Entities.User>().Add(entity);
			return result.Entity;
		}

		public Task<Entities.User> CreateAsync(Entities.User entity)
		{
			return Task.Run(() => this.Create(entity));
		}

		public void Delete(string key)
		{
			Entities.User user = this._context.Set<Entities.User>().SingleOrDefault(u => u.Id == key);
			if (user != null)
			{
				this._context.Set<Entities.User>().Remove(user);
			}
		}

		public Task DeleteAsync(string key)
		{
			return Task.Run(() => this.Delete(key));
		}

		public Entities.User Update(Entities.User entity)
		{
			throw new NotImplementedException();
		}

		public Task<Entities.User> UpdateAsync(Entities.User entity)
		{
			return Task.Run(() => this.Update(entity));
		}
	}
}