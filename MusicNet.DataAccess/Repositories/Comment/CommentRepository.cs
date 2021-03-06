﻿using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MusicNet.Common;

namespace MusicNet.DataAccess.Repositories.Comment
{
	public class CommentRepository : ICommentRepository
	{
		private readonly DbContext _context;

		public CommentRepository(DbContext context)
		{
			this._context = context;
		}

		public IEnumerable<Entities.Comment> GetAll()
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<Entities.Comment>> GetAllAsync()
		{
			throw new NotImplementedException();
		}

		public Entities.Comment GetById(string key)
		{
			throw new NotImplementedException();
		}

		public async Task<Entities.Comment> GetByIdAsync(string key)
		{
			Guard.ArgumentNotNullOrEmpty(key, nameof(key));
			Entities.Comment comment = await this._context.Set<Entities.Comment>().Include(c => c.User)
																				.SingleOrDefaultAsync(x => x.Id == key);
			return comment;
		}

		public Entities.Comment GetByPredicate(Expression<Func<Entities.Comment, bool>> p)
		{
			throw new NotImplementedException();
		}

		public Task<Entities.Comment> GetByPredicateAsync(Expression<Func<Entities.Comment, bool>> p)
		{
			throw new NotImplementedException();
		}

		public Entities.Comment Create(Entities.Comment entity)
		{
			entity.CreationDate = DateTime.UtcNow;
			entity.LastModifiedDate = DateTime.UtcNow;
			var result = this._context.Set<Entities.Comment>().Add(entity);
			return result.Entity;
		}

		public async Task<Entities.Comment> CreateAsync(Entities.Comment entity)
		{
			entity.CreationDate = DateTime.UtcNow;
			entity.LastModifiedDate = DateTime.UtcNow;
			var result = await this._context.Set<Entities.Comment>().AddAsync(entity);
			return result.Entity;
		}

		public void Delete(string key)
		{
			throw new NotImplementedException();
		}

		void IRepository<Entities.Comment>.DeleteAsync(string key)
		{
			throw new NotImplementedException();
		}

		public Entities.Comment Update(Entities.Comment entity)
		{
			throw new NotImplementedException();
		}

		public Task<Entities.Comment> UpdateAsync(Entities.Comment entity)
		{
			throw new NotImplementedException();
		}
	}
}