using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MusicNet.Common;
using MusicNet.DataAccess.Entities;
using MusicNet.DataAccess.UoWs;
using MusicNet.Services.Models;

namespace MusicNet.Services.Services.Posts
{
	public class PostService : IPostService
	{
		private readonly IBaseUnitOfWork _uow;

		private readonly IMapper _mapper;

		public PostService(IBaseUnitOfWork uow, IMapper mapper)
		{
			this._uow = uow;
			this._mapper = mapper;
		}

		public async Task<PostModel> AddPostAsync(PostModel postModel)
		{
			Guard.ArgumentNotNull(postModel, nameof(postModel));
			Guard.ArgumentNotNull(postModel.UserId, nameof(postModel.UserId));

			Post postEntity = this._mapper.Map<PostModel, Post>(postModel);
			var result = await this._uow.Posts.CreateAsync(postEntity);
			this._uow.Commit();

			Post createdPostEntity = await this._uow.Posts.GetByIdAsync(result.Id);
			PostModel createdPostModel = this._mapper.Map<Post, PostModel>(createdPostEntity);

			return createdPostModel;
		}

		public async Task<IEnumerable<PostModel>> GetPostsAsync(string userName, int startIndex, int count)
		{
			Guard.ArgumentNotNullOrWhiteSpace(userName, nameof(userName));
			Guard.ArgumentNotNull(count, nameof(count));

			IEnumerable<Post> posts = await this._uow.Posts.GetPostsByPredicateAsync(post => post.User.Name == userName, startIndex, count);
			IEnumerable<PostModel> postModels = this._mapper.Map<IEnumerable<Post>, IEnumerable<PostModel>>(posts.OrderByDescending(post => post.CreationDate).ToList());
			return postModels;
		}

		public async Task<IEnumerable<PostModel>> GetPostsFeedAsync(string userId, int startIndex, int count)
		{
			Guard.ArgumentNotNullOrWhiteSpace(userId, nameof(userId));
			Guard.ArgumentNotNull(count, nameof(count));

			IEnumerable<User> followingUsers = await this._uow.Users.GetUsersByPredicateAsync(user => user.Followers.Any(s => s.SubscriberId == userId), 0, 100);
			IList<string> followingUsersIds = followingUsers.Select(user => user.Id).ToList();
			followingUsersIds.Add(userId);

			IEnumerable<Post> posts = await this._uow.Posts.GetPostsByPredicateAsync(post => followingUsersIds.Contains(post.UserId), startIndex, count);
			IEnumerable<PostModel> postModels = this._mapper.Map<IEnumerable<Post>, IEnumerable<PostModel>>(posts.OrderByDescending(post => post.CreationDate).ToList());
			return postModels;
		}

		public async Task AddCommentToPostAsync(string postId, string userId, string text)
		{
			Guard.ArgumentNotNullOrWhiteSpace(postId, nameof(postId));
			Guard.ArgumentNotNullOrWhiteSpace(userId, nameof(userId));
			Guard.ArgumentNotNullOrWhiteSpace(text, nameof(text));

			Post post = await this._uow.Posts.GetByIdAsync(postId);
			if (post != null)
			{
				CommentModel commentModel = new CommentModel()
				{
					PostId = postId,
					UserId = userId,
					Text = text
				};
				Comment comment = this._mapper.Map<CommentModel, Comment>(commentModel);
				await this._uow.Comments.CreateAsync(comment);
				this._uow.Commit();
			}
		}
	}
}