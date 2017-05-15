using System;

namespace MusicNet.Services.Models
{
	public class CommentModel
	{
		public string Id { get; set; }

		public string Text { get; set; }

		public string PostId { get; set; }

		public string UserId { get; set; }

		public string UserName { get; set; }

		public string UserImgUrl { get; set; }

		public DateTime LastModifiedDate { get; set; }
	}
}