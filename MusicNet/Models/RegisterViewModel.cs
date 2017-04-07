using System.ComponentModel.DataAnnotations;

namespace MusicNet.Models
{
	public class RegisterViewModel
	{
		[Required]
		[DataType(DataType.EmailAddress)]
		public string Email { get; set; }

		[Required]
		public string Name { get; set; }

		[Required]
		[DataType(DataType.Password)]
		public string Password { get; set; }
	}
}