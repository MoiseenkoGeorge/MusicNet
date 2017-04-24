using AutoMapper;
using MusicNet.DataAccess.Entities;
using MusicNet.Services.Models;

namespace MusicNet.Services.Registrars
{
	public class MappingRegistrars : Profile
	{
		public MappingRegistrars()
		{
			this.RegisterAuthModels();
		}

		private void RegisterAuthModels()
		{
			this.CreateMap<UserModel, User>();
			this.CreateMap<User, UserModel>();
		}
	}
}