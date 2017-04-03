using System;
using Microsoft.EntityFrameworkCore;

namespace MusicNet.DataAccess.UoWs
{
	public class BaseUnitOfWork : IUnitOfWork
	{
		private bool _disposed = false;

		private readonly DbContext _context;

		public BaseUnitOfWork(DbContext context)
		{
			this._context = context;
		}

		public void Commit()
		{
			this._context?.SaveChanges();
		}

		public virtual void Dispose(bool disposing)
		{
			if (!this._disposed)
			{
				if (disposing)
				{
					this._context.Dispose();
				}
				this._disposed = true;
			}
		}

		public void Dispose()
		{
			this.Dispose(true);
		}
	}
}