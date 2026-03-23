# Create Service

Create a service interface and implementation with DI registration.

**Service for:** $ARGUMENTS

## Requirements

### 1. Create Interface (Application Layer)

Location: `src/[PROJECT_NAME].Application/Common/Interfaces/I[ServiceName]Service.cs`

```csharp
namespace [PROJECT_NAME].Application.Common.Interfaces;

/// <summary>
/// Service for [describe purpose]
/// </summary>
public interface I[ServiceName]Service
{
    /// <summary>
    /// [Method description]
    /// </summary>
    /// <param name="param1">[Parameter description]</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>[Return description]</returns>
    Task<Result<ReturnType>> MethodNameAsync(
        ParamType param1,
        CancellationToken cancellationToken = default);

    // Add other method signatures
}
```

**Guidelines:**
- Place in Application layer (defines the contract)
- Include XML documentation
- Use async methods with CancellationToken
- Return Result<T> for operations that can fail
- Keep interface focused (Single Responsibility)

### 2. Create Implementation (Infrastructure Layer)

Location: `src/[PROJECT_NAME].Infrastructure/Services/[ServiceName]Service.cs`

```csharp
namespace [PROJECT_NAME].Infrastructure.Services;

/// <summary>
/// Implementation of <see cref="I[ServiceName]Service"/>
/// </summary>
public class [ServiceName]Service(
    IApplicationDbContext context,
    ILogger<[ServiceName]Service> logger,
    IOptions<[ServiceName]Options> options)
    : I[ServiceName]Service
{
    private readonly [ServiceName]Options _options = options.Value;

    /// <inheritdoc />
    public async Task<Result<ReturnType>> MethodNameAsync(
        ParamType param1,
        CancellationToken cancellationToken = default)
    {
        try
        {
            logger.LogInformation(
                "Performing operation for {Param}", param1);

            // Implementation logic here

            return Result<ReturnType>.Success(result);
        }
        catch (Exception ex)
        {
            logger.LogError(ex,
                "Error performing operation for {Param}", param1);

            return Result<ReturnType>.Failure(
                Error.Unexpected("Operation failed"));
        }
    }
}
```

**Guidelines:**
- Use primary constructor for dependencies
- Implement the interface from Application layer
- Add logging for important operations
- Handle exceptions appropriately
- Use IOptions<T> for configuration

### 3. Create Options Class (if needed)

Location: `src/[PROJECT_NAME].Infrastructure/Services/[ServiceName]Options.cs`

```csharp
namespace [PROJECT_NAME].Infrastructure.Services;

public class [ServiceName]Options
{
    public const string SectionName = "[ServiceName]";

    public string Setting1 { get; set; } = string.Empty;
    public int Setting2 { get; set; }
    public TimeSpan Timeout { get; set; } = TimeSpan.FromSeconds(30);
}
```

### 4. Register in DI

Location: `src/[PROJECT_NAME].Infrastructure/DependencyInjection.cs`

```csharp
public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // Existing registrations...

        // Register options
        services.Configure<[ServiceName]Options>(
            configuration.GetSection([ServiceName]Options.SectionName));

        // Register service
        services.AddScoped<I[ServiceName]Service, [ServiceName]Service>();

        return services;
    }
}
```

### 5. Add Configuration (appsettings.json)

```json
{
  "[ServiceName]": {
    "Setting1": "value",
    "Setting2": 100,
    "Timeout": "00:00:30"
  }
}
```

### 6. Service Lifetime Guidelines

| Lifetime | Use When |
|----------|----------|
| `AddScoped` | Default for most services, per-request |
| `AddSingleton` | Stateless services, caches, configuration |
| `AddTransient` | Lightweight, stateless, no shared state |

```csharp
// Most services
services.AddScoped<IUserService, UserService>();

// Caching or shared state
services.AddSingleton<ICacheService, CacheService>();

// Lightweight utilities
services.AddTransient<IDateTimeService, DateTimeService>();
```

## Output

After creating:
1. Show interface in Application layer
2. Show implementation in Infrastructure layer
3. Show DI registration code
4. Show configuration section if using options
5. Note the service lifetime chosen and why

## Follow Patterns From

- Reference CLAUDE.md for conventions
- Follow existing service patterns in the project
- Match project's error handling approach
