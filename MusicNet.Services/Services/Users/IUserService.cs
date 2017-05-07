using System.Collections.Generic;
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
		Task<ProfileModel> GetProfileAsync(string name, string myId);

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

		Task SubscribeToUserAsync(string subscriberId, string publisherName);

		Task UnsubscribeFromUserAsync(string subscriberId, string publisherName);

		Task<IEnumerable<LightProfileModel>> GetUserFollowersAsync(string userName, string myId);

		Task<IEnumerable<LightProfileModel>> GetUserFollowingAsync(string userName, string myId);
	}
}