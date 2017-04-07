using Microsoft.Extensions.DependencyInjection;
using MusicNet.Services.Services.Auth;
using MusicNet.Services.Services.Users;

namespace MusicNet.Services.Registrars
{
	public static class DependencyRegistrars
	{
		public static void RegisterDependencies(IServiceCollection container)
		{
			// Data access
			MusicNet.DataAccess.Registrars.DependencyRegistrar.RegisterDependencies(container);

			// services
			container.AddTransient<IUserService, UserService>();
			container.AddTransient<IAuthService, AuthService>();
		}
	}
}