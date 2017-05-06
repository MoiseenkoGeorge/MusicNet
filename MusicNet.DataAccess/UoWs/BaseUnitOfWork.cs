using Microsoft.EntityFrameworkCore;
using MusicNet.DataAccess.Repositories.Comment;
using MusicNet.DataAccess.Repositories.Post;
using MusicNet.DataAccess.Repositories.Subscription;
using MusicNet.DataAccess.Repositories.Track;
using MusicNet.DataAccess.Repositories.User;

namespace MusicNet.DataAccess.UoWs
{
	public class BaseUnitOfWork : IBaseUnitOfWork
	{
		private readonly DbContext _context;

		private bool _disposed;

		private ITrackRepository _trackRepository;

		private ICommentRepository _commentRepository;

		private IPostRepository _postRepository;

		private IUserRepository _userRepository;

		private ISubscriptionRepository _subscriptionRepository;

		public BaseUnitOfWork(DbContext context)
		{
			this._context = context;
		}

		public IUserRepository Users => this._userRepository ?? (this._userRepository = new UserRepository(this._context));

		public IPostRepository Posts => this._postRepository ?? (this._postRepository = new PostRepository(this._context));

		public ICommentRepository Comments => this._commentRepository ?? (this._commentRepository = new CommentRepository(this._context));

		public ITrackRepository Tracks => this._trackRepository ?? (this._trackRepository = new TrackRepository(this._context));

		public ISubscriptionRepository Subscriptions => this._subscriptionRepository ?? (this._subscriptionRepository = new SubscriptionRepository(this._context));

		public void Commit()
		{
			this._context?.SaveChanges();
		}

		public void Dispose()
		{
			this.Dispose(true);
		}

		public virtual void Dispose(bool disposing)
		{
			if (!this._disposed)
			{
				if (disposing)
					this._context.Dispose();
				this._disposed = true;
			}
		}
	}
}