﻿using System;
using System.Threading.Tasks;
using System.Text;
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
		private readonly IMapper _mapper;

		private readonly IBaseUnitOfWork _uow;

		private readonly IAuthService _authService;

		public UserService(IMapper mapper, IBaseUnitOfWork uow, IAuthService authService)
		{
			this._mapper = mapper;
			this._uow = uow;
			this._authService = authService;
		}

		public async Task<UserModel> GetUserAsync(string id)
		{
			Guard.ArgumentNotNullOrWhiteSpace(id, nameof(id));

			User userEntity = await this._uow.Users.GetByIdAsync(id);
			UserModel userModel = this._mapper.Map<User, UserModel>(userEntity);
			return userModel;
		}

		public async Task<UserModel> GetUserByEmailAsync(string email)
		{
			Guard.ArgumentNotNullOrWhiteSpace(email, nameof(email));

			User userEntity = await this._uow.Users.GetByPredicateAsync((user) => user.Email == email);
			UserModel userModel = this._mapper.Map<User, UserModel>(userEntity);
			return userModel;
		}

		public async Task<UserModel> CreateUserAsync(UserModel user)
		{
			Guard.ArgumentNotNull(user, nameof(user));
			Guard.ArgumentNotNullOrWhiteSpace(user.Password, nameof(user.Password));

			User userEntity = this._uow.Users.GetByPredicate((u) => u.Email == user.Email);
			if (userEntity != null)
			{
				return null;
			}

			user.Password = this.GetHash(user.Password);
			userEntity = this._mapper.Map<UserModel, User>(user);
			User userEntityResult = await this._uow.Users.CreateAsync(userEntity);
			UserModel userModelResult = this._mapper.Map<User, UserModel>(userEntityResult);
			return userModelResult;
		}

		public void DeleteUser(UserModel user)
		{
			throw new System.NotImplementedException();
		}

		public void UpdateUser(UserModel user)
		{
			throw new System.NotImplementedException();
		}

		private string GetHash(string password)
		{
			byte[] passBytes = new UTF8Encoding().GetBytes(password);
			byte[] hashBytes;
			using (var algorithm = new System.Security.Cryptography.HMACSHA512())
			{
				hashBytes = algorithm.ComputeHash(passBytes);
			}
			return Convert.ToBase64String(hashBytes);
		}
	}
}