using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using MusicNet.Common;
using MusicNet.Services.Models;

namespace MusicNet.Services.Services.Auth
{
	public class AuthService : IAuthService
	{
		public string GetJwtToken(UserModel userModel)
		{
			Guard.ArgumentNotNull(userModel, nameof(userModel));

			var identity = this.GetIdentity(userModel);
			var nowDateTime = DateTime.UtcNow;
			var jwt = new JwtSecurityToken(
				AuthOptions.ISSUER,
				AuthOptions.AUDIENCE,
				notBefore: nowDateTime,
				claims: identity.Claims,
				expires: nowDateTime.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
				signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha512)
			);
			var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
			return encodedJwt;
		}

		private ClaimsIdentity GetIdentity(UserModel userModel)
		{
			var claims = new List<Claim>
			{
				new Claim(ClaimsIdentity.DefaultNameClaimType, userModel.Name)
			};

			var claimsIdentity = new ClaimsIdentity(claims, "Token");
			return claimsIdentity;
		}
	}
}