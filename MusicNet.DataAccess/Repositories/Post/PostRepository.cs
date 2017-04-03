using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MusicNet.DataAccess.Repositories.Post
{
	public class PostRepository : IPostRepository
	{
		private readonly DbContext _context;

		public PostRepository(DbContext context)
		{
			this._context = context;
		}
		public IEnumerable<Entities.Post> GetAll()
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<Entities.Post>> GetAllAsync()
		{
			throw new NotImplementedException();
		}

		public Entities.Post GetById(string key)
		{
			throw new NotImplementedException();
		}

		public Task<Entities.Post> GetByIdAsync(string key)
		{
			throw new NotImplementedException();
		}

		public Entities.Post GetByPredicate(Expression<Func<Entities.Post, bool>> p)
		{
			throw new NotImplementedException();
		}

		public Task<Entities.Post> GetByPredicateAsync(Expression<Func<Entities.Post, bool>> p)
		{
			throw new NotImplementedException();
		}

		public Entities.Post Create(Entities.Post entity)
		{
			throw new NotImplementedException();
		}

		public Task<Entities.Post> CreateAsync(Entities.Post entity)
		{
			throw new NotImplementedException();
		}

		public void Delete(string key)
		{
			throw new NotImplementedException();
		}

		public Task DeleteAsync(string key)
		{
			throw new NotImplementedException();
		}

		public Entities.Post Update(Entities.Post entity)
		{
			throw new NotImplementedException();
		}

		public Task<Entities.Post> UpdateAsync(Entities.Post entity)
		{
			throw new NotImplementedException();
		}
	}
}