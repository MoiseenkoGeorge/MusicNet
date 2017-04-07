using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MusicNet.DataAccess.Entities;

namespace MusicNet.Infrastructure.Extensions
{
	public static class DbRegistrar
	{
		public static void RegisterDataBase(IServiceCollection serviceCollection, string connectionString)
		{
			serviceCollection.AddDbContext<ApplicationContext>(options => options.UseSqlServer(connectionString, opt => opt.MigrationsAssembly("MusicNet.DataAccess")));
		}
	}
}