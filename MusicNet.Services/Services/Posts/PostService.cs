using AutoMapper;
using MusicNet.Common;
using MusicNet.DataAccess.Entities;
using MusicNet.DataAccess.UoWs;
using MusicNet.Services.Models;

namespace MusicNet.Services.Services.Posts
{
	public class PostService : IPostService
	{
		private readonly IBaseUnitOfWork _uow;

		private readonly IMapper _mapper;

		public PostService(IBaseUnitOfWork uow, IMapper mapper)
		{
			this._uow = uow;
			this._mapper = mapper;
		}

		public async void AddPost(PostModel postModel)
		{
			Guard.ArgumentNotNull(postModel, nameof(postModel));
			Guard.ArgumentNotNull(postModel.UserId, nameof(postModel.UserId));

			Post postEntity = this._mapper.Map<PostModel, Post>(postModel);
			await this._uow.Posts.CreateAsync(postEntity);
			this._uow.Commit();
		}
	}
}