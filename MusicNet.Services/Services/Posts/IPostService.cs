using System.Collections.Generic;
using System.Threading.Tasks;
using MusicNet.Services.Models;

namespace MusicNet.Services.Services.Posts
{
	public interface IPostService
	{
		Task<PostModel> AddPostAsync(PostModel postModel);

		Task<IEnumerable<PostModel>> GetPostsAsync(string userName, int startIndex, int count);

		Task<IEnumerable<PostModel>> GetPostsFeedAsync(string userId, int startIndex, int count);

		Task AddCommentToPostAsync(string postId, string userId, string text);
	}
}