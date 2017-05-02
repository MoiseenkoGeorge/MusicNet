using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace MusicNet.DataAccess.Entities
{
	/// <summary>
	///     The User.
	/// </summary>
	public class User : IEntity
	{
		/// <summary>
		///     Initializes a new instance of the <see cref="User" /> class.
		/// </summary>
		public User()
		{
			this.Posts = new HashSet<Post>();
			this.Followers = new HashSet<Subscription>();
			this.Following = new HashSet<Subscription>();
			this.Comments = new HashSet<Comment>();
		}

		/// <summary>
		///     The User Email.
		/// </summary>
		[Required]
		public string Email { get; set; }

		/// <summary>
		///     The User Password.
		/// </summary>
		[Required]
		public string Password { get; set; }

		/// <summary>
		///     The User Name.
		/// </summary>
		[Required]
		public string Name { get; set; }

		/// <summary>
		///     The Creation Date.
		/// </summary>
		[Required]
		public DateTime CreationDate { get; set; }

		/// <summary>
		/// The image url for Profile.
		/// </summary>
		public string ImageUrl { get; set; }

		/// <summary>
		///     The User Posts.
		/// </summary>
		public ICollection<Post> Posts { get; set; }

		/// <summary>
		///     The User Subscriptions.
		/// </summary>
		public ICollection<Subscription> Followers { get; set; }

		/// <summary>
		///     The User Subscribes.
		/// </summary>
		public ICollection<Subscription> Following { get; set; }

		/// <summary>
		///     The User Comments.
		/// </summary>
		public ICollection<Comment> Comments { get; set; }

		/// <summary>
		///     The User Id.
		/// </summary>
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public string Id { get; set; }
	}
}