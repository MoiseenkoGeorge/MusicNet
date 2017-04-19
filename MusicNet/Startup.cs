using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MusicNet.Common;
using MusicNet.Infrastructure.Extensions;

namespace MusicNet
{
	public class Startup
	{
		public Startup(IHostingEnvironment env)
		{
			var builder = new ConfigurationBuilder()
				.SetBasePath(env.ContentRootPath)
				.AddJsonFile("appsettings.json", false, true)
				.AddJsonFile($"appsettings.{env.EnvironmentName}.json", true)
				.AddEnvironmentVariables();
			this.Configuration = builder.Build();
		}

		public IConfigurationRoot Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			var connectionString = this.Configuration.GetConnectionString("DefaultConnection");
			services.AddDbRegistrar(connectionString);
			services.AddDependencyRegistrar();
			services.AddAutoMapper();
			services.AddMvc();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
		{
			app.UseDefaultFiles();
			app.UseStaticFiles();

			app.UseJwtBearerAuthentication(AuthOptions.GetJwtBearerOptions());
			app.UseMvc();

			loggerFactory.AddConsole(this.Configuration.GetSection("Logging"));
			loggerFactory.AddDebug();

			app.UseMvc();
		}
	}
}