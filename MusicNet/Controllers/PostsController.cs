using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MusicNet.Common;
using MusicNet.Models;
using MusicNet.Services.Models;
using MusicNet.Services.Services.Posts;

namespace MusicNet.Controllers
{
	[Route("api/[controller]")]
	[Authorize]
	public class PostsController : Controller
	{
		private readonly IMapper _mapper;

		private readonly IPostService _postService;

		public PostsController(IMapper mapper, IPostService postService)
		{
			this._mapper = mapper;
			this._postService = postService;
		}

		// POST api/posts
		[HttpPost]
		public async Task<IActionResult> Post([FromBody]PostViewModel postViewModel)
		{
			Guard.ArgumentNotNull(postViewModel, nameof(postViewModel));

			PostModel postModel = this._mapper.Map<PostViewModel, PostModel>(postViewModel);
			this._postService.AddPost(postModel);

			return this.NoContent();
		}
	}
}
