namespace MusicNet.Services.Models
{
	public class ProfileModel
	{
		public string Id { get; set; }

		public string Name { get; set; }

		public string ImageUrl { get; set; }

		public int Following { get; set; }

		public int Followers { get; set; }

		public int PostsCount { get; set; }

	}
}