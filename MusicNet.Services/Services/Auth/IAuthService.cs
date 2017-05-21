using MusicNet.Services.Models;

namespace MusicNet.Services.Services.Auth
{
	public interface IAuthService
	{
		string GetAccessJwtToken(UserModel userModel);

		string GetRefreshJwtToken(UserModel userModel);
	}
}