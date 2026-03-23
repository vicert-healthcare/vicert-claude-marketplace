# Generate Unit Tests

Generate unit tests using xUnit, Moq, and FluentAssertions.

**Tests for:** $ARGUMENTS

## Requirements

### 1. Determine Test Location

```
tests/[PROJECT_NAME].[Layer].Tests/
└── [MatchingPath]/
    └── [ClassName]Tests.cs
```

Example: Handler at `Application/Features/Users/Commands/CreateUser/CreateUserCommandHandler.cs`
Test at: `Application.Tests/Features/Users/Commands/CreateUser/CreateUserCommandHandlerTests.cs`

### 2. Test Class Structure

```csharp
namespace [PROJECT_NAME].[Layer].Tests.[Path];

public class [ClassName]Tests
{
    // Mocks
    private readonly Mock<IApplicationDbContext> _contextMock;
    private readonly Mock<ILogger<[ClassName]>> _loggerMock;

    // System under test
    private readonly [ClassName] _sut;

    public [ClassName]Tests()
    {
        _contextMock = new Mock<IApplicationDbContext>();
        _loggerMock = new Mock<ILogger<[ClassName]>>();

        // Setup common mocks
        _contextMock.Setup(x => x.Users).ReturnsDbSet(new List<User>());

        _sut = new [ClassName](
            _contextMock.Object,
            _loggerMock.Object);
    }

    [Fact]
    public async Task Method_Scenario_ExpectedResult()
    {
        // Arrange

        // Act

        // Assert
    }
}
```

### 3. Test Naming Convention

```
Method_Scenario_ExpectedResult
```

Examples:
- `Handle_WithValidCommand_ReturnsSuccess`
- `Handle_WithNonExistentUser_ReturnsNotFoundError`
- `Validate_WithEmptyEmail_HasValidationError`
- `GetById_WhenUserExists_ReturnsUserDto`

### 4. Test Patterns

**Testing Handlers:**

```csharp
public class CreateUserCommandHandlerTests
{
    private readonly Mock<IApplicationDbContext> _contextMock;
    private readonly CreateUserCommandHandler _sut;

    public CreateUserCommandHandlerTests()
    {
        _contextMock = new Mock<IApplicationDbContext>();
        var usersDbSet = new List<User>().AsQueryable().BuildMockDbSet();
        _contextMock.Setup(x => x.Users).Returns(usersDbSet.Object);

        _sut = new CreateUserCommandHandler(_contextMock.Object);
    }

    [Fact]
    public async Task Handle_WithValidCommand_ReturnsSuccessWithId()
    {
        // Arrange
        var command = new CreateUserCommand("test@example.com", "Test User");

        // Act
        var result = await _sut.Handle(command, CancellationToken.None);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().BeGreaterThan(0);
    }

    [Fact]
    public async Task Handle_WithValidCommand_CallsSaveChanges()
    {
        // Arrange
        var command = new CreateUserCommand("test@example.com", "Test User");

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        _contextMock.Verify(
            x => x.SaveChangesAsync(It.IsAny<CancellationToken>()),
            Times.Once);
    }
}
```

**Testing Validators:**

```csharp
public class CreateUserCommandValidatorTests
{
    private readonly Mock<IApplicationDbContext> _contextMock;
    private readonly CreateUserCommandValidator _sut;

    public CreateUserCommandValidatorTests()
    {
        _contextMock = new Mock<IApplicationDbContext>();
        var usersDbSet = new List<User>().AsQueryable().BuildMockDbSet();
        _contextMock.Setup(x => x.Users).Returns(usersDbSet.Object);

        _sut = new CreateUserCommandValidator(_contextMock.Object);
    }

    [Fact]
    public async Task Validate_WithValidCommand_IsValid()
    {
        // Arrange
        var command = new CreateUserCommand("test@example.com", "Test User");

        // Act
        var result = await _sut.ValidateAsync(command);

        // Assert
        result.IsValid.Should().BeTrue();
    }

    [Theory]
    [InlineData("")]
    [InlineData(null)]
    [InlineData("   ")]
    public async Task Validate_WithEmptyEmail_HasValidationError(string? email)
    {
        // Arrange
        var command = new CreateUserCommand(email!, "Test User");

        // Act
        var result = await _sut.ValidateAsync(command);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(e => e.PropertyName == "Email");
    }

    [Fact]
    public async Task Validate_WithInvalidEmailFormat_HasValidationError()
    {
        // Arrange
        var command = new CreateUserCommand("not-an-email", "Test User");

        // Act
        var result = await _sut.ValidateAsync(command);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(e =>
            e.PropertyName == "Email" &&
            e.ErrorMessage.Contains("email"));
    }

    [Fact]
    public async Task Validate_WithExistingEmail_HasValidationError()
    {
        // Arrange
        var existingUsers = new List<User>
        {
            new() { Id = 1, Email = "existing@example.com", Name = "Existing" }
        };
        _contextMock.Setup(x => x.Users)
            .ReturnsDbSet(existingUsers);

        var command = new CreateUserCommand("existing@example.com", "New User");

        // Act
        var result = await _sut.ValidateAsync(command);

        // Assert
        result.IsValid.Should().BeFalse();
        result.Errors.Should().Contain(e =>
            e.PropertyName == "Email" &&
            e.ErrorMessage.Contains("exists"));
    }
}
```

**Testing Services:**

```csharp
public class UserServiceTests
{
    private readonly Mock<IUserRepository> _repositoryMock;
    private readonly Mock<ILogger<UserService>> _loggerMock;
    private readonly UserService _sut;

    public UserServiceTests()
    {
        _repositoryMock = new Mock<IUserRepository>();
        _loggerMock = new Mock<ILogger<UserService>>();

        _sut = new UserService(
            _repositoryMock.Object,
            _loggerMock.Object);
    }

    [Fact]
    public async Task GetByIdAsync_WhenUserExists_ReturnsUser()
    {
        // Arrange
        var expectedUser = new User { Id = 1, Email = "test@example.com" };
        _repositoryMock
            .Setup(x => x.GetByIdAsync(1, It.IsAny<CancellationToken>()))
            .ReturnsAsync(expectedUser);

        // Act
        var result = await _sut.GetByIdAsync(1);

        // Assert
        result.Should().NotBeNull();
        result.Should().BeEquivalentTo(expectedUser);
    }

    [Fact]
    public async Task GetByIdAsync_WhenUserNotFound_ReturnsNull()
    {
        // Arrange
        _repositoryMock
            .Setup(x => x.GetByIdAsync(999, It.IsAny<CancellationToken>()))
            .ReturnsAsync((User?)null);

        // Act
        var result = await _sut.GetByIdAsync(999);

        // Assert
        result.Should().BeNull();
    }
}
```

### 5. Useful FluentAssertions

```csharp
// Basic assertions
result.Should().NotBeNull();
result.Should().BeEquivalentTo(expected);
result.Should().BeOfType<UserDto>();

// Collection assertions
users.Should().HaveCount(3);
users.Should().Contain(u => u.Email == "test@example.com");
users.Should().BeInAscendingOrder(u => u.Name);

// Exception assertions
await act.Should().ThrowAsync<ValidationException>();
await act.Should().NotThrowAsync();

// Result pattern assertions
result.IsSuccess.Should().BeTrue();
result.Value.Should().BeGreaterThan(0);
result.Error?.Code.Should().Be("NotFound");
```

### 6. Mocking DbSet with MockQueryable

```csharp
// Install: MockQueryable.Moq
var users = new List<User> { /* ... */ };
var mockDbSet = users.AsQueryable().BuildMockDbSet();
_contextMock.Setup(x => x.Users).Returns(mockDbSet.Object);
```

## Output

Generate tests covering:
1. Happy path (success scenarios)
2. Edge cases (null, empty, boundary values)
3. Error scenarios (not found, validation failures)
4. Verify mock interactions where appropriate

## Follow Patterns From

- Reference CLAUDE.md for test conventions
- Follow existing test patterns in the project
- Match project's naming conventions
