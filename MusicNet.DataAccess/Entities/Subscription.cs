using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MusicNet.DataAccess.Entities
{
	/// <summary>
	///     The Subscription
	/// </summary>
	public class Subscription
	{
		/// <summary>
		///     The Id.
		/// </summary>
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public string Id { get; set; }

		/// <summary>
		///     The subscriber Id.
		/// </summary>
		public string SubscriberId { get; set; }

		/// <summary>
		///     The Subscriber.
		/// </summary>
		public User Subscriber { get; set; }

		/// <summary>
		///     The Publisher Id.
		/// </summary>
		public string PublisherId { get; set; }

		/// <summary>
		///     The Publisher.
		/// </summary>
		public User Publisher { get; set; }
	}
}