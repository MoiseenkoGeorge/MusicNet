using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MusicNet.DataAccess.Entities;
using MusicNet.DataAccess.UoWs;

namespace MusicNet.DataAccess.Registrars
{
	/// <summary>Registers Dependencies.</summary>
	public static class DependencyRegistrar
	{
		public static void RegisterDependencies(IServiceCollection container)
		{
			// Context
			container.AddScoped<DbContext, ApplicationContext>();

			// Unit of Work
			container.AddTransient<IBaseUnitOfWork, BaseUnitOfWork>();
		}
	}
}