﻿using AutoMapper;
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
			this.RegisterSubscriptionModels();
		}

		private void RegisterUserModels()
		{
			this.CreateMap<UserModel, User>();
			this.CreateMap<User, UserModel>();

			this.CreateMap<User, ProfileModel>();

			this.CreateMap<User, LightProfileModel>();
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

			this.CreateMap<TrackModel, PostTrack>()
				.ForMember(dest => dest.TrackId, src => src.MapFrom(tm => tm.Id));
			this.CreateMap<PostTrack, TrackModel>()
				.ForMember(dest => dest.Id, src => src.MapFrom(pt => pt.Track.Id))
				.ForMember(dest => dest.Name, src => src.MapFrom(pt => pt.Track.Name))
				.ForMember(dest => dest.Album, src => src.MapFrom(pt => pt.Track.Album))
				.ForMember(dest => dest.Author, src => src.MapFrom(pt => pt.Track.Author))
				.ForMember(dest => dest.Url, src => src.MapFrom(pt => pt.Track.Url));
		}

		private void RegisterCommentModels()
		{
			this.CreateMap<CommentModel, Comment>();
			this.CreateMap<Comment, CommentModel>()
				.ForMember(dest => dest.UserImgUrl, src => src.MapFrom(c => c.User.ImageUrl))
				.ForMember(dest => dest.UserName, src => src.MapFrom(c => c.User.Name));
		}

		private void RegisterSubscriptionModels()
		{
			this.CreateMap<SubscriptionModel, Subscription>();
			this.CreateMap<Subscription, SubscriptionModel>();
		}
	}
}