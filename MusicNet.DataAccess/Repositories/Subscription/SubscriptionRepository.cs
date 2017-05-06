using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MusicNet.DataAccess.Repositories.Subscription
{
	public class SubscriptionRepository : ISubscriptionRepository
	{
		private readonly DbContext _context;

		public SubscriptionRepository(DbContext context)
		{
			this._context = context;
		}

		public IEnumerable<Entities.Subscription> GetAll()
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<Entities.Subscription>> GetAllAsync()
		{
			throw new NotImplementedException();
		}

		public Entities.Subscription GetById(string key)
		{
			throw new NotImplementedException();
		}

		public Task<Entities.Subscription> GetByIdAsync(string key)
		{
			throw new NotImplementedException();
		}

		public Entities.Subscription GetByPredicate(Expression<Func<Entities.Subscription, bool>> p)
		{
			throw new NotImplementedException();
		}

		public Task<Entities.Subscription> GetByPredicateAsync(Expression<Func<Entities.Subscription, bool>> p)
		{
			throw new NotImplementedException();
		}

		public Entities.Subscription Create(Entities.Subscription entity)
		{
			throw new NotImplementedException();
		}

		public async Task<Entities.Subscription> CreateAsync(Entities.Subscription entity)
		{
			var result = await this._context.Set<Entities.Subscription>().AddAsync(entity);
			return result.Entity;
		}

		public void Delete(string key)
		{
			Entities.Subscription subscription = new Entities.Subscription()
			{
				Id = key
			};
			this._context.Set<Entities.Subscription>().Attach(subscription);
			this._context.Set<Entities.Subscription>().Remove(subscription);
		}

		public void DeleteAsync(string key)
		{
			throw new NotImplementedException();
		}

		public Entities.Subscription Update(Entities.Subscription entity)
		{
			throw new NotImplementedException();
		}

		public Task<Entities.Subscription> UpdateAsync(Entities.Subscription entity)
		{
			throw new NotImplementedException();
		}
	}
}