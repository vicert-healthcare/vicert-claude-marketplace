# Generate Integration Tests

Generate integration tests using WebApplicationFactory.

**Integration tests for:** $ARGUMENTS

## Requirements

### 1. Test Location

```
tests/[PROJECT_NAME].Api.Tests/
└── [Feature]EndpointsTests.cs
```

### 2. Test Fixture Setup

```csharp
namespace [PROJECT_NAME].Api.Tests;

public class [Feature]EndpointsTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;
    private readonly WebApplicationFactory<Program> _factory;

    public [Feature]EndpointsTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                // Remove real database
                var descriptor = services.SingleOrDefault(
                    d => d.ServiceType == typeof(DbContextOptions<ApplicationDbContext>));
                if (descriptor != null)
                    services.Remove(descriptor);

                // Add in-memory database
                services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseInMemoryDatabase($"TestDb_{Guid.NewGuid()}"));

                // Replace external services with fakes
                services.RemoveAll<IEmailService>();
                services.AddScoped<IEmailService, FakeEmailService>();
            });
        });

        _client = _factory.CreateClient();
    }
}
```

### 3. Test Patterns

**GET Endpoint Tests:**

```csharp
[Fact]
public async Task GetById_WhenExists_Returns200WithData()
{
    // Arrange - seed data
    using var scope = _factory.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    var user = new User { Email = "test@example.com", Name = "Test User" };
    context.Users.Add(user);
    await context.SaveChangesAsync();

    // Act
    var response = await _client.GetAsync($"/api/users/{user.Id}");

    // Assert
    response.StatusCode.Should().Be(HttpStatusCode.OK);

    var result = await response.Content.ReadFromJsonAsync<UserDto>();
    result.Should().NotBeNull();
    result!.Email.Should().Be("test@example.com");
}

[Fact]
public async Task GetById_WhenNotExists_Returns404()
{
    // Act
    var response = await _client.GetAsync("/api/users/99999");

    // Assert
    response.StatusCode.Should().Be(HttpStatusCode.NotFound);
}

[Fact]
public async Task GetAll_ReturnsPagedList()
{
    // Arrange - seed data
    using var scope = _factory.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    context.Users.AddRange(
        new User { Email = "user1@example.com", Name = "User 1" },
        new User { Email = "user2@example.com", Name = "User 2" },
        new User { Email = "user3@example.com", Name = "User 3" }
    );
    await context.SaveChangesAsync();

    // Act
    var response = await _client.GetAsync("/api/users?page=1&pageSize=10");

    // Assert
    response.StatusCode.Should().Be(HttpStatusCode.OK);

    var result = await response.Content.ReadFromJsonAsync<PagedList<UserDto>>();
    result.Should().NotBeNull();
    result!.Items.Should().HaveCountGreaterOrEqualTo(3);
}
```

**POST Endpoint Tests:**

```csharp
[Fact]
public async Task Create_WithValidData_Returns201()
{
    // Arrange
    var request = new { Email = "new@example.com", Name = "New User" };

    // Act
    var response = await _client.PostAsJsonAsync("/api/users", request);

    // Assert
    response.StatusCode.Should().Be(HttpStatusCode.Created);
    response.Headers.Location.Should().NotBeNull();

    var id = await response.Content.ReadFromJsonAsync<int>();
    id.Should().BeGreaterThan(0);

    // Verify in database
    using var scope = _factory.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    var user = await context.Users.FindAsync(id);
    user.Should().NotBeNull();
    user!.Email.Should().Be("new@example.com");
}

[Fact]
public async Task Create_WithInvalidEmail_Returns400()
{
    // Arrange
    var request = new { Email = "not-an-email", Name = "Test" };

    // Act
    var response = await _client.PostAsJsonAsync("/api/users", request);

    // Assert
    response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
}

[Fact]
public async Task Create_WithDuplicateEmail_Returns400()
{
    // Arrange - create existing user
    using var scope = _factory.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    context.Users.Add(new User { Email = "existing@example.com", Name = "Existing" });
    await context.SaveChangesAsync();

    var request = new { Email = "existing@example.com", Name = "Duplicate" };

    // Act
    var response = await _client.PostAsJsonAsync("/api/users", request);

    // Assert
    response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
}
```

**PUT Endpoint Tests:**

```csharp
[Fact]
public async Task Update_WithValidData_Returns204()
{
    // Arrange
    using var scope = _factory.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    var user = new User { Email = "original@example.com", Name = "Original" };
    context.Users.Add(user);
    await context.SaveChangesAsync();

    var request = new { Id = user.Id, Email = "updated@example.com", Name = "Updated" };

    // Act
    var response = await _client.PutAsJsonAsync($"/api/users/{user.Id}", request);

    // Assert
    response.StatusCode.Should().Be(HttpStatusCode.NoContent);

    // Verify update
    context.Entry(user).Reload();
    user.Email.Should().Be("updated@example.com");
}

[Fact]
public async Task Update_WhenNotExists_Returns404()
{
    // Arrange
    var request = new { Id = 99999, Email = "test@example.com", Name = "Test" };

    // Act
    var response = await _client.PutAsJsonAsync("/api/users/99999", request);

    // Assert
    response.StatusCode.Should().Be(HttpStatusCode.NotFound);
}
```

**DELETE Endpoint Tests:**

```csharp
[Fact]
public async Task Delete_WhenExists_Returns204()
{
    // Arrange
    using var scope = _factory.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    var user = new User { Email = "delete@example.com", Name = "ToDelete" };
    context.Users.Add(user);
    await context.SaveChangesAsync();
    var userId = user.Id;

    // Act
    var response = await _client.DeleteAsync($"/api/users/{userId}");

    // Assert
    response.StatusCode.Should().Be(HttpStatusCode.NoContent);

    // Verify deletion
    var deleted = await context.Users.FindAsync(userId);
    deleted.Should().BeNull();
}
```

### 4. Authentication in Tests

```csharp
public class AuthenticatedEndpointsTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public AuthenticatedEndpointsTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                // Add test authentication
                services.AddAuthentication("Test")
                    .AddScheme<AuthenticationSchemeOptions, TestAuthHandler>(
                        "Test", options => { });
            });
        }).CreateClient();

        // Add auth header
        _client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Test");
    }
}

// Test auth handler
public class TestAuthHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    protected override Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, "test-user-id"),
            new Claim(ClaimTypes.Email, "test@example.com"),
            new Claim(ClaimTypes.Role, "Admin")
        };
        var identity = new ClaimsIdentity(claims, "Test");
        var principal = new ClaimsPrincipal(identity);
        var ticket = new AuthenticationTicket(principal, "Test");

        return Task.FromResult(AuthenticateResult.Success(ticket));
    }
}
```

### 5. Custom WebApplicationFactory

```csharp
public class CustomWebApplicationFactory : WebApplicationFactory<Program>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            // Standard test configuration
            var descriptor = services.SingleOrDefault(
                d => d.ServiceType == typeof(DbContextOptions<ApplicationDbContext>));
            if (descriptor != null)
                services.Remove(descriptor);

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseInMemoryDatabase("TestDb"));
        });

        builder.UseEnvironment("Testing");
    }
}
```

## Output

Generate integration tests covering:
1. All HTTP methods (GET, POST, PUT, DELETE)
2. Success scenarios (200, 201, 204)
3. Error scenarios (400, 404, 401/403)
4. Data persistence verification
5. Validation error responses

## Follow Patterns From

- Reference CLAUDE.md for test conventions
- Follow existing integration test patterns
- Match project's authentication approach
