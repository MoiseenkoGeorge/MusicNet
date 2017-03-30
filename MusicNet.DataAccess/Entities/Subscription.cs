namespace MusicNet.DataAccess.Entities
{
	/// <summary>
	/// The Subscription 
	/// </summary>
	public class Subscription
	{
		/// <summary>
		/// The subscriber Id.
		/// </summary>
		public string SubscriberId { get; set; }

		/// <summary>
		/// The Subscriber.
		/// </summary>
		public User Subscriber { get; set; }

		/// <summary>
		/// The Publisher Id.
		/// </summary>
		public string PublisherId { get; set; }

		/// <summary>
		/// The Publisher.
		/// </summary>
		public User Publisher { get; set; }
	}
}