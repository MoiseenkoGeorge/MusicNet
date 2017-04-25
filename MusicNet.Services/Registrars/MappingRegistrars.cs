using AutoMapper;
using MusicNet.DataAccess.Entities;
using MusicNet.Services.Models;

namespace MusicNet.Services.Registrars
{
	public class MappingRegistrars : Profile
	{
		public MappingRegistrars()
		{
			this.RegisterUserModels();
			this.RegisterPostModels();
			this.RegisterTrackModels();
			this.RegisterCommentModels();
		}

		private void RegisterUserModels()
		{
			this.CreateMap<UserModel, User>();
			this.CreateMap<User, UserModel>();

			this.CreateMap<User, ProfileModel>()
				.ForMember(dest => dest.Subscribes, src => src.MapFrom(u => u.Subscriptions.Count));
		}

		private void RegisterPostModels()
		{
			this.CreateMap<PostModel, Post>();
			this.CreateMap<Post, PostModel>();
		}

		private void RegisterTrackModels()
		{
			this.CreateMap<TrackModel, Track>();
			this.CreateMap<Track, TrackModel>();
		}

		private void RegisterCommentModels()
		{
			this.CreateMap<CommentModel, Comment>();
			this.CreateMap<Comment, CommentModel>();
		}
	}
}