using System.Collections.Generic;

namespace MusicNet.Services.Models
{
	public class ProfileModel
	{
		public string Id { get; set; }

		public string Name { get; set; }

		public string ImageUrl { get; set; }

		public ICollection<SubscriptionModel> Following { get; set; }

		public ICollection<SubscriptionModel> Followers { get; set; }

		public int PostsCount { get; set; }

		public bool IsFollowedByMe { get; set; }
	}
}