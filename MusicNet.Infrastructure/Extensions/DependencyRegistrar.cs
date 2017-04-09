using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace MusicNet.Infrastructure.Extensions
{
	/// <summary>
	/// The dependency registrar.
	/// </summary>
	public static class DependencyRegistrar
	{
		public static void RegisterDependencies(IServiceCollection serviceCollection)
		{
			// Services
			MusicNet.Services.Registrars.DependencyRegistrars.RegisterDependencies(serviceCollection);
		}
	}
}