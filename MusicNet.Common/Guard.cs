using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace MusicNet.Common
{
	/// <summary>Class for defensive programming around arguments.</summary>
	public static class Guard
	{
		/// <summary>Method to protect against null argument values by throwing an <see cref="ArgumentNullException"/>.</summary>
		/// <param name="argumentValue">The argument value.</param>
		/// <param name="argumentName">The argument name.</param>
		[DebuggerStepThrough]
		public static void ArgumentNotNull(object argumentValue, string argumentName)
		{
			if (argumentValue == null)
			{
				throw new ArgumentNullException(argumentName);
			}
		}

		/// <summary>Guards against all given parameters being null.</summary>
		/// <param name="optionalParameters">The optional parameters.</param>
		public static void ArgumentsNotNull(params object[] optionalParameters)
		{
			optionalParameters.ToList().ForEach(parameter => ArgumentNotNull(() => parameter));
		}

		/// <summary>Checks an argument to ensure it isn't null.</summary>
		/// <param name="argumentExpression">The argument expression.</param>
		public static void ArgumentNotNull(Expression<Func<dynamic>> argumentExpression)
		{
			ArgumentNotNull(argumentExpression, "argumentExpression");

			UnaryExpression unaryExpression = argumentExpression.Body as UnaryExpression;

			MemberExpression memberExpression = unaryExpression != null
													? (MemberExpression)unaryExpression.Operand
													: (MemberExpression)argumentExpression.Body;

			FieldInfo fieldInfo = memberExpression.Member as FieldInfo;

			if (fieldInfo != null && fieldInfo.GetValue(((ConstantExpression)memberExpression.Expression).Value) == null)
			{
				throw new ArgumentNullException(memberExpression.Member.Name);
			}
		}

		/// <summary>
		/// Method to protect against null or empty string argument values by throwing an <see cref="ArgumentNullException"/> 
		/// for a null parameter value or an <see cref="ArgumentException"/> for a value of empty string.
		/// </summary>
		/// <param name="argumentValue">The argument value.</param>
		/// <param name="argumentName">Parameter name.</param>
		[DebuggerStepThrough]
		public static void ArgumentNotNullOrEmpty(string argumentValue, string argumentName)
		{
			ArgumentNotNull(argumentValue, argumentName);

			if (argumentValue.Length == 0)
			{
				throw new ArgumentException("The argument value cannot be null or empty string.", argumentName);
			}
		}

		/// <summary>
		/// Method to protect against null or empty collection argument values by throwing an <see cref="ArgumentNullException"/> 
		/// for a null parameter value or an <see cref="ArgumentException"/> for an empty collection.
		/// </summary>
		/// <typeparam name="T">The type of the generic enumerable.</typeparam>
		/// <param name="argumentValue">The argument value.</param>
		/// <param name="argumentName">The parameter name.</param>
		[DebuggerStepThrough]
		public static void ArgumentNotNullOrEmpty<T>(IEnumerable<T> argumentValue, string argumentName)
		{
			ArgumentNotNull(argumentValue, argumentName);

			if (!argumentValue.Any())
			{
				throw new ArgumentException("The argument value cannot be an empty collection.", argumentName);
			}
		}

		/// <summary>Arguments the not null or white space.</summary>
		/// <param name="argumentValue">The argument value.</param>
		/// <param name="argumentName">Name of the argument.</param>
		[DebuggerStepThrough]
		public static void ArgumentNotNullOrWhiteSpace(string argumentValue, string argumentName)
		{
			ArgumentNotNull(argumentValue, argumentName);

			if (string.IsNullOrWhiteSpace(argumentValue))
			{
				throw new ArgumentException("The argument value cannot be null or whitespace.", argumentName);
			}
		}

		/// <summary>GUID Arguments not empty.</summary>
		/// <param name="argumentValue">The argument value.</param>
		/// <param name="argumentName">Name of the argument.</param>
		[DebuggerStepThrough]
		public static void ArgumentGuidNotEmpty(Guid argumentValue, string argumentName)
		{
			ArgumentNotNull(argumentValue, argumentName);
			if (argumentValue == Guid.Empty)
			{
				throw new ArgumentException("The argument value cannot be null or empty.", argumentName);
			}
		}
	}
}
