using System;

namespace MusicNet.DataAccess.UoWs
{
	/// <summary>
	/// The Unit of Work interface.
	/// </summary>
	public interface IUnitOfWork : IDisposable
	{
		void Commit();
	}
}