using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MusicNet.Common;
using MusicNet.DataAccess.Entities;
using MusicNet.DataAccess.UoWs;
using MusicNet.Services.Models;
using MusicNet.Services.Services.Auth;

namespace MusicNet.Services.Services.Users
{
	public class UserService : IUserService
	{
		private readonly IAuthService _authService;
		private readonly IMapper _mapper;

		private readonly IBaseUnitOfWork _uow;

		public UserService(IMapper mapper, IBaseUnitOfWork uow, IAuthService authService)
		{
			this._mapper = mapper;
			this._uow = uow;
			this._authService = authService;
		}

		public async Task<UserModel> GetUserAsync(string id)
		{
			Guard.ArgumentNotNullOrWhiteSpace(id, nameof(id));

			var userEntity = await this._uow.Users.GetByIdAsync(id);
			var userModel = this._mapper.Map<User, UserModel>(userEntity);
			return userModel;
		}

		public async Task<UserModel> LoginAsync(UserModel userModel)
		{
			Guard.ArgumentNotNull(userModel, nameof(userModel));
			Guard.ArgumentNotNull(userModel.Name, nameof(userModel.Name));
			Guard.ArgumentNotNull(userModel.Password, nameof(userModel.Password));

			var user = await this._uow.Users.GetByPredicateAsync(u => u.Name == userModel.Name);
			if (user == null)
				return null;

			userModel.Password = this.GetHash(userModel.Password);
			return string.Equals(userModel.Password, user.Password, StringComparison.OrdinalIgnoreCase) ? userModel : null;
		}

		public async Task<UserModel> CreateUserAsync(UserModel user)
		{
			Guard.ArgumentNotNull(user, nameof(user));
			Guard.ArgumentNotNullOrWhiteSpace(user.Password, nameof(user.Password));

			var userEntity = this._uow.Users.GetByPredicate(u => u.Name == user.Name);
			if (userEntity != null)
				return null;

			user.Password = this.GetHash(user.Password);
			userEntity = this._mapper.Map<UserModel, User>(user);
			var userEntityResult = await this._uow.Users.CreateAsync(userEntity);
			var userModelResult = this._mapper.Map<User, UserModel>(userEntityResult);
			return userModelResult;
		}

		public void DeleteUser(UserModel user)
		{
			throw new NotImplementedException();
		}

		public void UpdateUser(UserModel user)
		{
			throw new NotImplementedException();
		}

		private string GetHash(string password)
		{
			var passBytes = new UTF8Encoding().GetBytes(password);
			byte[] hashBytes;
			using (var algorithm = new HMACSHA512())
			{
				hashBytes = algorithm.ComputeHash(passBytes);
			}
			return Convert.ToBase64String(hashBytes);
		}
	}
}