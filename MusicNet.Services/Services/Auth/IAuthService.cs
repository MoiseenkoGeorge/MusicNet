using System.IdentityModel.Tokens.Jwt;
using MusicNet.Services.Models;

namespace MusicNet.Services.Services.Auth
{
	public interface IAuthService
	{
		string GetJwtToken(UserModel userModel);
	}
}