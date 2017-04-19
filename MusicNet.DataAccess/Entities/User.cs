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
			this.Subscriptions = new HashSet<Subscription>();
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
		///     The User Posts.
		/// </summary>
		[SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
		public ICollection<Post> Posts { get; set; }

		/// <summary>
		///     The User Subscriptions.
		/// </summary>
		[SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
		public ICollection<Subscription> Subscriptions { get; set; }

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