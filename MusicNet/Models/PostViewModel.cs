﻿using System.Collections.Generic;

namespace MusicNet.Models
{
	public class PostViewModel
	{
		public string Id { get; set; }

		public string Text { get; set; }

		public string ImageUrl { get; set; }

		public ICollection<TrackViewModel> Tracks { get; set; }

		public ICollection<CommentViewModel> Comments { get; set; }
	}
}
