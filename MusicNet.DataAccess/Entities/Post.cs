using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MusicNet.DataAccess.Entities
{
	/// <summary>
	///     The Post entity.
	/// </summary>
	public class Post : IEntity
	{
		/// <summary>
		///     Initializes a new instance of the <see cref="Post" /> class.
		/// </summary>
		public Post()
		{
			this.Tracks = new HashSet<PostTrack>();
			this.Comments = new HashSet<Comment>();
		}

		/// <summary>
		///     The Creation Date.
		/// </summary>
		public DateTime CreationDate { get; set; }

		/// <summary>
		///     The Post content.
		/// </summary>
		public string Text { get; set; }

		/// <summary>
		///     The image url.
		/// </summary>
		public string ImageUrl { get; set; }

		/// <summary>
		///     The user Id.
		/// </summary>
		public string UserId { get; set; }

		/// <summary>
		///     The User.
		/// </summary>
		[ForeignKey("UserId")]
		public User User { get; set; }

		/// <summary>
		///     The Post Tracks.
		/// </summary>
		public ICollection<PostTrack> Tracks { get; set; }

		/// <summary>
		///     The Post comments.
		/// </summary>
		public ICollection<Comment> Comments { get; set; }

		/// <summary>
		///     The Id.
		/// </summary>
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public string Id { get; set; }
	}
}