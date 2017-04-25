﻿using AutoMapper;
using MusicNet.Models;
using MusicNet.Services.Models;

namespace MusicNet
{
	public class MappingRegistrar : Profile
	{
		public MappingRegistrar()
		{
			this.RegisterUserModels();
			this.RegisterPostModels();
			this.RegisterTrackModels();
			this.RegisterCommentModels();
		}

		private void RegisterUserModels()
		{
			this.CreateMap<LoginViewModel, UserModel>();
			this.CreateMap<UserModel, LoginViewModel>();

			this.CreateMap<RegisterViewModel, UserModel>();
			this.CreateMap<UserModel, RegisterViewModel>();

			this.CreateMap<ProfileModel, ProfileViewModel>();
			this.CreateMap<ProfileViewModel, ProfileModel>();
		}

		private void RegisterPostModels()
		{
			this.CreateMap<PostViewModel, PostModel>();
			this.CreateMap<PostModel, PostViewModel>();
		}

		private void RegisterTrackModels()
		{
			this.CreateMap<TrackViewModel, TrackModel>();
			this.CreateMap<TrackModel, TrackViewModel>();
		}

		private void RegisterCommentModels()
		{
			this.CreateMap<CommentViewModel, CommentModel>();
			this.CreateMap<CommentModel, CommentViewModel>();
		}
	}
}