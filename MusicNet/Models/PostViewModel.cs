
using System.Collections.Generic;

namespace MusicNet.Models
{
	public class PostViewModel
	{
		public string PostText { get; set; }

		public string ImageUrl { get; set; }

		public ICollection<TrackViewModel> Tracks { get; set; }

		public ICollection<CommentViewModel> Comments { get; set; }
	}
}
