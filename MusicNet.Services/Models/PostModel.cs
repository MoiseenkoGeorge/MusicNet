using System;
using System.Collections.Generic;

namespace MusicNet.Services.Models
{
	public class PostModel
	{
		public string Id { get; set; }

		public string UserId { get; set; }

		public DateTime CreationDate { get; set; }

		public string Text { get; set; }

		public string ImageUrl { get; set; }

		public ICollection<TrackModel> Tracks { get; set; }

		public ICollection<CommentModel> Comments { get; set; }
	}
}