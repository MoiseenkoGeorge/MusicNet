using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using AppContext = MusicNet.DataAccess.Entities.AppContext;

namespace MusicNet.Migrations
{
    [DbContext(typeof(AppContext))]
    [Migration("20170322110138_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("MusicNet.DataAccess.Models.Post", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreationDate");

                    b.Property<string>("ImageUrl");

                    b.Property<string>("Text");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Posts");
                });

            modelBuilder.Entity("MusicNet.DataAccess.Models.PostTrack", b =>
                {
                    b.Property<string>("PostId");

                    b.Property<string>("TrackId");

                    b.HasKey("PostId", "TrackId");

                    b.HasIndex("TrackId");

                    b.ToTable("PostTrack");
                });

            modelBuilder.Entity("MusicNet.DataAccess.Models.Track", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Album");

                    b.Property<string>("Author");

                    b.Property<string>("Name");

                    b.Property<string>("Url");

                    b.HasKey("Id");

                    b.ToTable("Tracks");
                });

            modelBuilder.Entity("MusicNet.DataAccess.Models.User", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreationDate");

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<string>("Password")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("MusicNet.DataAccess.Models.Post", b =>
                {
                    b.HasOne("MusicNet.DataAccess.Models.User", "User")
                        .WithMany("Posts")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("MusicNet.DataAccess.Models.PostTrack", b =>
                {
                    b.HasOne("MusicNet.DataAccess.Models.Post", "Post")
                        .WithMany("PostTracks")
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MusicNet.DataAccess.Models.Track", "Track")
                        .WithMany("PostTracks")
                        .HasForeignKey("TrackId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
