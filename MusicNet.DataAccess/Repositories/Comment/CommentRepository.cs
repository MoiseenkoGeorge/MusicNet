﻿using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

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

		public Task<Entities.Comment> GetByIdAsync(string key)
		{
			throw new NotImplementedException();
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
			var result = this._context.Set<Entities.Comment>().Add(entity);
			return result.Entity;
		}

		public async Task<Entities.Comment> CreateAsync(Entities.Comment entity)
		{
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