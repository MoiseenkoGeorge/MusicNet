﻿using System.Threading.Tasks;

namespace MusicNet.DataAccess.Repositories.Subscription
{
	public interface ISubscriptionRepository : IRepository<Entities.Subscription>
	{
		void Remove(Entities.Subscription entity);
	}
}