﻿using System;
using System.Collections.Generic;
using System.Linq;
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
			entity.CreationDate = DateTime.Now;
			var result = this._context.Set<Entities.Post>().Add(entity);
			return result.Entity;
		}

		public async Task<Entities.Post> CreateAsync(Entities.Post entity)
		{
			entity.CreationDate = DateTime.Now;
			var result = await this._context.Set<Entities.Post>().AddAsync(entity);
			return result.Entity;
		}

		public void Delete(string key)
		{
			throw new NotImplementedException();
		}

		void IRepository<Entities.Post>.DeleteAsync(string key)
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

		public async Task<IEnumerable<Entities.Post>> GetPostsByPredicateAsync(Expression<Func<Entities.Post, bool>> p, int position, int count)
		{
			var result = await this._context.Set<Entities.Post>().Where(p)
																.Skip(position)
																.Take(count)
																.ToListAsync();
			return result;
		}
	}
}