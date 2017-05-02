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
				.ForMember(dest => dest.Followers, src => src.MapFrom(u => u.Followers.Count))
				.ForMember(dest => dest.Following, src => src.MapFrom(u => u.Following.Count));
		}

		private void RegisterPostModels()
		{
			this.CreateMap<PostModel, Post>();
			this.CreateMap<Post, PostModel>()
				.ForMember(dest => dest.UserName, src => src.MapFrom(post => post.User.Name))
				.ForMember(dest => dest.UserImgUrl, src => src.MapFrom(post => post.User.ImageUrl));
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