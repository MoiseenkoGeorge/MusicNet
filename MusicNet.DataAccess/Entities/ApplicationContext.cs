using Microsoft.EntityFrameworkCore;

namespace MusicNet.DataAccess.Entities
{
	/// <summary>
	///     The Application Context.
	/// </summary>
	public class ApplicationContext : DbContext
	{
		/// <summary>
		///     Initializes a new instance of the <see cref="ApplicationContext" /> class.
		/// </summary>
		/// <param name="options"></param>
		public ApplicationContext(DbContextOptions<ApplicationContext> options)
			: base(options)
		{
		}

		/// <summary>
		///     The Users DbSet.
		/// </summary>
		public DbSet<User> Users { get; set; }

		/// <summary>
		///     The Posts DbSet.
		/// </summary>
		public DbSet<Post> Posts { get; set; }

		/// <summary>
		///     The Tracks DbSet.
		/// </summary>
		public DbSet<Track> Tracks { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<User>()
				.HasMany(u => u.Posts)
				.WithOne(p => p.User)
				.HasForeignKey(p => p.UserId);

			modelBuilder.Entity<User>()
				.HasMany(u => u.Comments)
				.WithOne(c => c.User)
				.HasForeignKey(c => c.UserId);

			modelBuilder.Entity<User>()
				.HasMany(u => u.Subscriptions)
				.WithOne(s => s.Publisher)
				.HasForeignKey(s => s.PublisherId);

			modelBuilder.Entity<Subscription>()
				.HasOne(s => s.Publisher)
				.WithMany(u => u.Subscriptions)
				.HasForeignKey(u => u.PublisherId);

			modelBuilder.Entity<Post>()
				.HasOne(p => p.User)
				.WithMany(u => u.Posts)
				.HasForeignKey(p => p.UserId);

			modelBuilder.Entity<Post>()
				.HasMany(p => p.Comments)
				.WithOne(c => c.Post)
				.HasForeignKey(c => c.PostId);

			modelBuilder.Entity<Comment>()
				.HasOne(c => c.Post)
				.WithMany(p => p.Comments)
				.HasForeignKey(c => c.PostId);

			modelBuilder.Entity<Comment>()
				.HasOne(c => c.User)
				.WithMany(u => u.Comments)
				.HasForeignKey(c => c.UserId);

			modelBuilder.Entity<PostTrack>()
				.HasKey(x => new {x.PostId, x.TrackId});
		}
	}
}