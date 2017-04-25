using System.Threading.Tasks;
using MusicNet.Services.Models;

namespace MusicNet.Services.Services.Users
{
	/// <summary>
	///     The user interface.
	/// </summary>
	public interface IUserService
	{
		/// <summary>
		///     Get profile async.
		/// </summary>
		/// <param name="name">The User name.</param>
		/// <returns>The Profile model.</returns>
		Task<ProfileModel> GetProfileAsync(string name);

		/// <summary>
		///     Login User Async.
		/// </summary>
		/// <param name="userModel">The User model.</param>
		/// <returns>Returns signed in USer Model if Login is correct.</returns>
		Task<UserModel> LoginAsync(UserModel userModel);

		/// <summary>
		///     To Create the user.
		/// </summary>
		/// <param name="user">The User model.</param>
		/// <returns>The User model.</returns>
		Task<UserModel> CreateUserAsync(UserModel user);

		/// <summary>
		///     To Delete the user.
		/// </summary>
		/// <param name="user">The user.</param>
		void DeleteUser(UserModel user);

		/// <summary>
		///     To update the User.
		/// </summary>
		/// <param name="user">The user.</param>
		void UpdateUser(UserModel user);
	}
}