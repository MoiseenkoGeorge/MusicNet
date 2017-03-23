using Microsoft.EntityFrameworkCore;

namespace MusicNet.DataAccess.Entities
{
	/// <summary>
	/// The Application Context.
	/// </summary>
	public class AppContext : DbContext
	{
		/// <summary>
		/// The Users DbSet.
		/// </summary>
		public DbSet<User> Users { get; set; }

		/// <summary>
		/// The Posts DbSet.
		/// </summary>
		public DbSet<Post> Posts { get; set; }

		/// <summary>
		/// The Tracks DbSet.
		/// </summary>
		public DbSet<Track> Tracks { get; set; }

		/// <summary>
		/// Initializes a new instance of the <see cref="AppContext"/> class.
		/// </summary>
		/// <param name="options"></param>
		public AppContext(DbContextOptions<AppContext> options)
			: base(options)
		{
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<User>()
				.HasMany(u => u.Posts)
				.WithOne(p => p.User)
				.HasForeignKey(p => p.UserId);

			modelBuilder.Entity<Post>()
				.HasOne(p => p.User)
				.WithMany(u => u.Posts);

			modelBuilder.Entity<PostTrack>()
				.HasKey(x => new { x.PostId, x.TrackId });

		}
		
	}
}