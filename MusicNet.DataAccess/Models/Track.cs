using System.Collections.Generic;

namespace MusicNet.DataAccess.Models
{
	/// <summary>
	/// The music track.
	/// </summary>
	public class Track
	{
		/// <summary>
		/// Initializes a new instance of the <see cref="Track"/> class.
		/// </summary>
		public Track()
		{
			this.PostTracks = new HashSet<PostTrack>();
		}

		/// <summary>
		/// The Id.
		/// </summary>
		public string Id { get; set; }

		/// <summary>
		/// The Track Name.
		/// </summary>
		public string Name { get; set; }

		/// <summary>
		/// The Track Album.
		/// </summary>
		public string Album { get; set; }

		/// <summary>
		/// The Track Author.
		/// </summary>
		public string Author { get; set; }

		/// <summary>
		/// The Track Url.
		/// </summary>
		public string Url { get; set; }

		/// <summary>
		/// The Post Tracks.
		/// </summary>
		public ICollection<PostTrack> PostTracks { get; set; }
	}
}