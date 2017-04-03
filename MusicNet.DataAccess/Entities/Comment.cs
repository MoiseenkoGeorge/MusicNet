using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MusicNet.DataAccess.Entities
{
	/// <summary>
	/// The Comment.
	/// </summary>
	public class Comment : IEntity
	{
		/// <summary>
		/// The comment Id.
		/// </summary>
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public string Id { get; set; }

		/// <summary>
		/// The Post Id.
		/// </summary>
		public string PostId { get; set; }

		/// <summary>
		/// The Post.
		/// </summary>
		public Post Post { get; set; }

		/// <summary>
		/// The User Id.
		/// </summary>
		public string UserId { get; set; }

		/// <summary>
		/// The User.
		/// </summary>
		[ForeignKey("UserId")]
		public User User { get; set; }

		/// <summary>
		/// The Creation Date.
		/// </summary>
		public DateTime CreationDate { get; set; }

		/// <summary>
		/// The Last Modified date.
		/// </summary>
		public DateTime LastModifiedDate { get; set; }

		/// <summary>
		/// The Text.
		/// </summary>
		public string Text { get; set; }
	}
}