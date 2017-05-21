using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MusicNet.DataAccess.UoWs;
using Moq;
using MusicNet.DataAccess.Entities;
using MusicNet.Services.Models;
using MusicNet.Services.Services.Search;


namespace MusicNet.UnitTests.Services
{
	[TestClass]
	public class UserServiceTests
	{
		private readonly Mock<IMapper> _mockMapper;

		private readonly Mock<IBaseUnitOfWork> _mockBaseUnitOfWork;

		private readonly ISearchService _searchService;

		public UserServiceTests()
		{
			this._mockMapper = new Mock<IMapper>();
			this._mockBaseUnitOfWork = new Mock<IBaseUnitOfWork>();
			this._searchService = new SearchService(this._mockMapper.Object, this._mockBaseUnitOfWork.Object);
		}

		[TestMethod]
		public async void GetProfileAsyncReturnsCorrectProfiles()
		{
			// Arrange
			IEnumerable<User> returnedModels = new List<User>()
			{
				new User()
				{
					Name = "Alexander"
				},
				new User()
				{
					Name = "Alexey"
				}
			};

			string term = "al";
			int position = 0;
			int count = 2;
			this._mockBaseUnitOfWork.Setup(x => x.Users.GetUsersByPredicateAsync(user => user.Name.Contains(term), position, count))
									.Returns(Task.FromResult(returnedModels))
									.Verifiable();

			// Act
			IEnumerable<LightProfileModel> result = await this._searchService.GetUsersByNameAsync(term, 0, 2);

			// Assert
			Assert.AreEqual(2, result.Count());
			this._mockBaseUnitOfWork.Verify();
		}
	}
}