using Microsoft.Extensions.DependencyInjection;
using MusicNet.Common;

namespace MusicNet.Infrastructure.Extensions
{
	public static class DependencyRegistrarServiceCollectionExtensions
	{
		public static IServiceCollection AddDependencyRegistrar(this IServiceCollection services)
		{
			Guard.ArgumentNotNull(services, nameof(services));

			DependencyRegistrar.RegisterDependencies(services);
			return services;
		}
	}
}
