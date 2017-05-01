using MusicNet.DataAccess.Repositories.Comment;
using MusicNet.DataAccess.Repositories.Post;
using MusicNet.DataAccess.Repositories.Track;
using MusicNet.DataAccess.Repositories.User;

namespace MusicNet.DataAccess.UoWs
{
	/// <summary>
	///     The Users UOW interface.
	/// </summary>
	public interface IBaseUnitOfWork : IUnitOfWork
	{
		/// <summary>
		///     The User Repository.
		/// </summary>
		IUserRepository Users { get; }

		/// <summary>
		///     The Post Repository.
		/// </summary>
		IPostRepository Posts { get; }

		/// <summary>
		///     The Comments Repository.
		/// </summary>
		ICommentRepository Comments { get; }

		/// <summary>
		/// The Tracks Repository.
		/// </summary>
		ITrackRepository Tracks { get; }
	}
}