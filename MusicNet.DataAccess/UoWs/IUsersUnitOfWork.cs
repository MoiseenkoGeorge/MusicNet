using MusicNet.DataAccess.Repositories.Post;
using MusicNet.DataAccess.Repositories.User;

namespace MusicNet.DataAccess.UoWs
{
	/// <summary>
	/// The Users UOW interface.
	/// </summary>
	public interface IUsersUnitOfWork : IUnitOfWork
	{
		/// <summary>
		/// The User Repository.
		/// </summary>
		IUserRepository Users { get; }

		/// <summary>
		/// The Post Repository.
		/// </summary>
		IPostRepository Posts { get; }
	}
}