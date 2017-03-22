namespace MusicNet.DataAccess.Models
{
	/// <summary>
	/// The PostTrack entity.
	/// </summary>
	public class PostTrack
	{
		/// <summary>
		/// The Post Id.
		/// </summary>
		public string PostId { get; set; }

		/// <summary>
		/// The Post.
		/// </summary>
		public Post Post { get; set; }

		/// <summary>
		/// The track Id.
		/// </summary>
		public string TrackId { get; set; }

		/// <summary>
		/// The Track.
		/// </summary>
		public Track Track { get; set; }
	}
}