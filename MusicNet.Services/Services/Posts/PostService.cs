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

		public async void AddPost(PostModel postModel)
		{
			Guard.ArgumentNotNull(postModel, nameof(postModel));
			Guard.ArgumentNotNull(postModel.UserId, nameof(postModel.UserId));

			Post postEntity = this._mapper.Map<PostModel, Post>(postModel);
			await this._uow.Posts.CreateAsync(postEntity);
			this._uow.Commit();
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

			IEnumerable<User> followingUsers = await this._uow.Users.GetUsersByPredicateAsync(user => user.Followers.Any(s => s.SubscriberId == userId));
			IEnumerable<string> followingUsersIds = followingUsers.Select(user => user.Id);

			IEnumerable<Post> posts = await this._uow.Posts.GetPostsByPredicateAsync(post => followingUsersIds.Contains(post.UserId), startIndex, count);
			IEnumerable<PostModel> postModels = this._mapper.Map<IEnumerable<Post>, IEnumerable<PostModel>>(posts.OrderByDescending(post => post.CreationDate).ToList());
			return postModels;
		}
	}
}