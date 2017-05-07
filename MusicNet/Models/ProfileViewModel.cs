namespace MusicNet.Models
{
	public class ProfileViewModel
	{
		public string Id { get; set; }

		public string Name { get; set; }

		public string ImageUrl { get; set; }

		public int FollowingCount { get; set; }

		public int FollowersCount { get; set; }

		public int PostsCount { get; set; }

		public bool IsFollowedByMe { get; set; }
	}
}