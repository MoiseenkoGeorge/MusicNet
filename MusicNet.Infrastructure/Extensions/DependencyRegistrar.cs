using Microsoft.Extensions.DependencyInjection;
using MusicNet.Services.Registrars;

namespace MusicNet.Infrastructure.Extensions
{
	/// <summary>
	///     The dependency registrar.
	/// </summary>
	public static class DependencyRegistrar
	{
		public static void RegisterDependencies(IServiceCollection serviceCollection)
		{
			// Services
			DependencyRegistrars.RegisterDependencies(serviceCollection);
		}
	}
}