using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace MusicNet.DataAccess.Entities
{
	/// <summary>
	/// The Post entity.
	/// </summary>
	public class Post
	{
		/// <summary>
		/// Initializes a new instance of the <see cref="Post"/> class.
		/// </summary>
		public Post()
		{
			this.PostTracks = new HashSet<PostTrack>();
		}
		/// <summary>
		/// The Id.
		/// </summary>
		public string Id { get; set; }

		/// <summary>
		/// The Creation Date.
		/// </summary>
		public DateTime CreationDate { get; set; }

		/// <summary>
		/// The Post content.
		/// </summary>
		public string Text { get; set; }

		/// <summary>
		/// The image url.
		/// </summary>
		public string ImageUrl { get; set; }

		/// <summary>
		/// The user Id.
		/// </summary>
		public string UserId { get; set; }
		
		/// <summary>
		/// The User.
		/// </summary>
		[ForeignKey("UserId")]
		public User User { get; set; }

		/// <summary>
		/// The Post Tracks.
		/// </summary>
		public ICollection<PostTrack> PostTracks { get; set; }
	}
}