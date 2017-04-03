using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace MusicNet.Registrars
{
	/// <summary>
	/// Authentication Options Class.
	/// </summary>
	public static class AuthOptions
	{
		/// <summary>
		/// Token publisher.
		/// </summary>
		public const string ISSUER = "MyAuthServer";

		/// <summary>
		/// Token Consumer.
		/// </summary>
		public const string AUDIENCE = "MyLocalServer";

		/// <summary>
		/// The key for encryption.
		/// </summary>
		private const string KEY = "mysupersecret_secretkey!3123";

		/// <summary>
		/// The token lifetime in minutes.
		/// </summary>
		public const int LIFETIME = 1;

		/// <summary>
		/// Getting SymmetricSecurityKey instance.
		/// </summary>
		/// <returns>The SymmetricSecurityKey object.</returns>
		public static SymmetricSecurityKey GetSymmetricSecurityKey()
		{
			return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
		}
	}
}