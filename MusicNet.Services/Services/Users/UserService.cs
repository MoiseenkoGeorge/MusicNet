using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MusicNet.Common;
using MusicNet.DataAccess.Entities;
using MusicNet.DataAccess.UoWs;
using MusicNet.Services.Models;

namespace MusicNet.Services.Services.Users
{
	public class UserService : IUserService
	{
		private readonly IMapper _mapper;

		private readonly IBaseUnitOfWork _uow;

		public UserService(IMapper mapper, IBaseUnitOfWork uow)
		{
			this._mapper = mapper;
			this._uow = uow;
		}

		public async Task<ProfileModel> GetProfileAsync(string name, string myId)
		{
			Guard.ArgumentNotNullOrWhiteSpace(name, nameof(name));

			var userEntity = await this._uow.Users.GetByPredicateAsync(u => u.Name == name);
			if (userEntity != null)
			{
				ProfileModel profileModel = this._mapper.Map<User, ProfileModel>(userEntity);
				profileModel.PostsCount = await this._uow.Posts.GetPostsCountForUserAsync(userEntity.Id);
				profileModel.IsFollowedByMe = profileModel.Followers.Select(x => x.SubscriberId).Contains(myId);
				return profileModel;
			}
			return null;
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
			return string.Equals(userModel.Password, user.Password, StringComparison.OrdinalIgnoreCase) ? this._mapper.Map<User, UserModel>(user) : null;
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
			this._uow.Commit();
			
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

		public async Task SubscribeToUserAsync(string subscriberId, string publisherName)
		{
			Guard.ArgumentNotNullOrWhiteSpace(subscriberId, nameof(subscriberId));
			Guard.ArgumentNotNullOrWhiteSpace(publisherName, nameof(publisherName));

			User publisherUser = await this._uow.Users.GetByPredicateAsync(u => u.Name == publisherName);
			Subscription existingSubscription = await this._uow.Subscriptions.GetByPredicateAsync(s => s.SubscriberId == subscriberId && s.PublisherId == publisherUser.Id);
			if (existingSubscription == null)
			{
				SubscriptionModel subscriptionModel = new SubscriptionModel()
				{
					SubscriberId = subscriberId,
					PublisherId = publisherUser.Id
				};

				Subscription subscription = this._mapper.Map<SubscriptionModel, Subscription>(subscriptionModel);
				await this._uow.Subscriptions.CreateAsync(subscription);
				this._uow.Commit();
			}
		}

		public async Task UnsubscribeFromUserAsync(string subscriberId, string publisherName)
		{
			Guard.ArgumentNotNullOrWhiteSpace(subscriberId, nameof(subscriberId));
			Guard.ArgumentNotNullOrWhiteSpace(publisherName, nameof(publisherName));

			User publisherUser = await this._uow.Users.GetByPredicateAsync(u => u.Name == publisherName);
			Subscription subscription = await this._uow.Subscriptions.GetByPredicateAsync(s => s.SubscriberId == subscriberId && s.PublisherId == publisherUser.Id);
			if (subscription != null)
			{
				this._uow.Subscriptions.Delete(subscription.Id);
				this._uow.Commit();
			}
		}

		public async Task<IEnumerable<LightProfileModel>> GetUserFollowersAsync(string userName, string myId)
		{
			Guard.ArgumentNotNullOrWhiteSpace(userName, nameof(userName));

			var userEntity = await this._uow.Users.GetByPredicateAsync(u => u.Name == userName);
			if (userEntity != null)
			{
				IEnumerable<User> followerUsers = await this._uow.Users.GetUsersByPredicateAsync(x => x.Following.Any(u => u.PublisherId == userEntity.Id));
				IEnumerable<LightProfileModel> lightProfileModels = this._mapper.Map<IEnumerable<User>, IEnumerable<LightProfileModel>>(followerUsers).ToList();
				foreach (var profile in lightProfileModels)
				{
					profile.IsFollowedByMe = profile.Followers.Select(x => x.SubscriberId).Contains(myId);
				}

				return lightProfileModels;
			}

			return null;
		}

		public async Task<IEnumerable<LightProfileModel>> GetUserFollowingAsync(string userName, string myId)
		{
			Guard.ArgumentNotNullOrWhiteSpace(userName, nameof(userName));

			var userEntity = await this._uow.Users.GetByPredicateAsync(u => u.Name == userName);
			if (userEntity != null)
			{
				IEnumerable<User> followingUsers = await this._uow.Users.GetUsersByPredicateAsync(x => x.Followers.Any(u => u.SubscriberId == userEntity.Id));
				IEnumerable<LightProfileModel> lightProfileModels = this._mapper.Map<IEnumerable<User>, IEnumerable<LightProfileModel>>(followingUsers);
				foreach (var profile in lightProfileModels)
				{
					profile.IsFollowedByMe = profile.Followers.Select(x => x.SubscriberId).Contains(myId);
				}

				return lightProfileModels;
			}

			return null;
		}

		private string GetHash(string password)
		{
			var passBytes = new UTF8Encoding().GetBytes(password);
			byte[] hashBytes;
			using (var algorithm = SHA512.Create())
			{
				hashBytes = algorithm.ComputeHash(passBytes);
			}
			return Convert.ToBase64String(hashBytes);
		}
	}
}