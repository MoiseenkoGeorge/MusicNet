using Microsoft.Extensions.DependencyInjection;
using MusicNet.Common;

namespace MusicNet.Infrastructure.Extensions
{
	public static class DbRegistrarServiceCollectionExtensions
	{
		public static IServiceCollection AddDbRegistrar(this IServiceCollection serviceCollection, string connectionString)
		{
			Guard.ArgumentNotNull(serviceCollection, nameof(serviceCollection));
			Guard.ArgumentNotNullOrEmpty(connectionString, nameof(connectionString));

			DbRegistrar.RegisterDataBase(serviceCollection, connectionString);
			return serviceCollection;
		}
	}
}