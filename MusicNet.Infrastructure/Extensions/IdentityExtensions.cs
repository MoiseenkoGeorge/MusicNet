using System;
using System.Globalization;
using System.Security.Claims;
using System.Security.Principal;
using MusicNet.Common;

namespace MusicNet.Infrastructure.Extensions
{
	public static class IdentityExtensions
	{
		public static T GetUserId<T>(this IIdentity identity) where T : IConvertible
		{
			Guard.ArgumentNotNull(identity, nameof(identity));

			ClaimsIdentity claimsIdentity = identity as ClaimsIdentity;
			var id = claimsIdentity?.FindFirst(ClaimTypes.NameIdentifier);
			if (id != null)
			{
				return (T) Convert.ChangeType(id.Value, typeof(T), CultureInfo.InvariantCulture);
			}
			return default(T);
		}
	}
}
