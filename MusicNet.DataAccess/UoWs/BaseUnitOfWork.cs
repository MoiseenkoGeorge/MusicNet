using Microsoft.EntityFrameworkCore;
using MusicNet.DataAccess.Repositories.Comment;
using MusicNet.DataAccess.Repositories.Post;
using MusicNet.DataAccess.Repositories.User;

namespace MusicNet.DataAccess.UoWs
{
	public class BaseUnitOfWork : IBaseUnitOfWork
	{
		private bool _disposed = false;

		private readonly DbContext _context;

		private IUserRepository _userRepository;

		private IPostRepository _postRepository;

		private ICommentRepository _commentRepository;

		public IUserRepository Users => this._userRepository ?? (this._userRepository = new UserRepository(this._context));

		public IPostRepository Posts => this._postRepository ?? (this._postRepository = new PostRepository(this._context));

		public ICommentRepository Comments => this._commentRepository ?? (this._commentRepository = new CommentRepository(this._context));

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