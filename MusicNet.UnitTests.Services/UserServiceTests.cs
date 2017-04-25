using AutoMapper;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MusicNet.DataAccess.UoWs;
using MusicNet.Services.Services.Users;
using Moq;


namespace MusicNet.UnitTests.Services
{
	[TestClass]
	public class UserServiceTests
	{
		private readonly Mock<IMapper> _mockMapper;

		private readonly Mock<IBaseUnitOfWork> _mockBaseUnitOfWork;

		private readonly IUserService _userService;

		public UserServiceTests()
		{
			this._mockMapper = new Mock<IMapper>();
			this._mockBaseUnitOfWork = new Mock<IBaseUnitOfWork>();
			this._userService = new UserService(this._mockMapper.Object, this._mockBaseUnitOfWork.Object);
		}
	}
}