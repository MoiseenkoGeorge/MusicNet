using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MusicNet.DataAccess.Entities
{
	/// <summary>
	/// The music track.
	/// </summary>
	public class Track : IEntity
	{
		/// <summary>
		/// Initializes a new instance of the <see cref="Track"/> class.
		/// </summary>
		public Track()
		{
			this.Posts = new HashSet<PostTrack>();
		}

		/// <summary>
		/// The Id.
		/// </summary>
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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
		public ICollection<PostTrack> Posts { get; set; }
	}
}