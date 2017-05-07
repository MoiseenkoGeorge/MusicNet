namespace MusicNet.Services.Models
{
	public class SubscriptionModel
	{
		public string SubscriberId { get; set; }

		public UserModel Subscriber { get; set; }

		public string PublisherId { get; set; }

		public UserModel Publisher { get; set; }
	}
}