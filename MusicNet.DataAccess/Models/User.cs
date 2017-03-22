﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MusicNet.DataAccess.Models
{
	/// <summary>
	/// The User.
	/// </summary>
	public class User
	{
		/// <summary>
		/// Initializes a new instance of the <see cref="User"/> class.
		/// </summary>
		public User()
		{
			this.Posts = new HashSet<Post>();
		}

		/// <summary>
		/// The User Id.
		/// </summary>
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public string Id { get; set; }

		/// <summary>
		/// The User Email.
		/// </summary>
		[Required]
		public string Email { get; set; }

		/// <summary>
		/// The User Password.
		/// </summary>
		[Required]
		public string Password { get; set; }

		/// <summary>
		/// The User Name.
		/// </summary>
		[Required]
		public string Name { get; set; }

		/// <summary>
		/// The Creation Date.
		/// </summary>
		public DateTime CreationDate { get; set; }

		/// <summary>
		/// The User Posts.
		/// </summary>
		[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
		public ICollection<Post> Posts { get; set; }
	}
}