
using System.Collections.Generic;

namespace MusicNet.Models
{
	public class AddPostViewModel
	{
		public string Text { get; set; }

		public string ImageUrl { get; set; }

		public ICollection<TrackViewModel> Tracks { get; set; }
	}
}
