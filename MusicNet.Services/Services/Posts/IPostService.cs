using MusicNet.Services.Models;

namespace MusicNet.Services.Services.Posts
{
	public interface IPostService
	{
		void AddPost(PostModel postModel);
	}
}