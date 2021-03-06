﻿using System;

namespace MusicNet.Models
{
	public class CommentViewModel
	{
		public string UserId { get; set; }

		public string UserName { get; set; }

		public string UserImgUrl { get; set; }

		public string Text { get; set; }

		public DateTime LastModifiedDate { get; set; }
	}
}