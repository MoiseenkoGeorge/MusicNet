using AutoMapper;
using MusicNet.Models;
using MusicNet.Services.Models;

namespace MusicNet
{
	public class MappingRegistrar : Profile
	{
		public MappingRegistrar()
		{
			this.RegisterAuthModels();
		}

		private void RegisterAuthModels()
		{
			this.CreateMap<LoginViewModel, UserModel>();
			this.CreateMap<UserModel, LoginViewModel>();

			this.CreateMap<RegisterViewModel, UserModel>();
			this.CreateMap<UserModel, RegisterViewModel>();
		}
	}
}