using System.Collections.Generic;

namespace MusicNet.Services.Models
{
	public class LightProfileModel
	{
		public string Id { get; set; }

		public string Name { get; set; }

		public string ImageUrl { get; set; }

		public bool IsFollowedByMe { get; set; }

		public ICollection<SubscriptionModel> Followers { get; set; }
	}
}
