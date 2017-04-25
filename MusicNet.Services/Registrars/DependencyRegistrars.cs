using Microsoft.Extensions.DependencyInjection;
using MusicNet.DataAccess.Registrars;
using MusicNet.Services.Services.Auth;
using MusicNet.Services.Services.Posts;
using MusicNet.Services.Services.Users;

namespace MusicNet.Services.Registrars
{
	public static class DependencyRegistrars
	{
		public static void RegisterDependencies(IServiceCollection container)
		{
			// Data access
			DependencyRegistrar.RegisterDependencies(container);

			// services
			container.AddTransient<IUserService, UserService>();
			container.AddTransient<IAuthService, AuthService>();
			container.AddTransient<IPostService, PostService>();
		}
	}
}