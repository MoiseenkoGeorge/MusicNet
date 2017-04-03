using Microsoft.EntityFrameworkCore;
using MusicNet.DataAccess.Repositories.Post;
using MusicNet.DataAccess.Repositories.User;

namespace MusicNet.DataAccess.UoWs
{
	/// <summary>
	/// The users UoW.
	/// </summary>
	public class UsersUoW : BaseUnitOfWork, IUsersUnitOfWork
	{
		private readonly IUserRepository _userRepository;

		private readonly IPostRepository _postRepository;

		public IUserRepository Users => this._userRepository;

		public IPostRepository Posts => this._postRepository;

		public UsersUoW(DbContext context) : base(context)
		{
			this._userRepository = new UserRepository(context);
			this._postRepository = new PostRepository(context);
		}
	}
}