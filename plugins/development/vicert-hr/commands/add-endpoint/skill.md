# Add API Endpoint

Create a complete API endpoint following VicertHR patterns.

**Endpoint for:** $ARGUMENTS

## Requirements

### 1. Create DTOs (Application Layer)

Location: `src/backend/VicertHRLite.Application/DTOs/{Feature}/`

```csharp
namespace VicertHRLite.Application.DTOs;

public class [Entity]Dto
{
    public int Id { get; set; }
    // Properties matching the entity
}

public class Create[Entity]Dto
{
    // Required properties for creation (no Id)
}

public class Update[Entity]Dto
{
    // Properties that can be updated
}
```

**Guidelines:**
- DTOs go in Application layer
- Use nullable reference types appropriately
- Include XML documentation for complex properties

### 2. Add Service Method (Application Layer)

Location: `src/backend/VicertHRLite.Application/Services/{Feature}Service.cs`

```csharp
public interface I[Feature]Service
{
    Task<[Entity]Dto> Get[Entity]ByIdAsync(int id);
    Task<IEnumerable<[Entity]Dto>> GetAll[Entities]Async();
    Task<[Entity]Dto> Create[Entity]Async(Create[Entity]Dto dto);
    Task<[Entity]Dto> Update[Entity]Async(int id, Update[Entity]Dto dto);
    Task Delete[Entity]Async(int id);
}
```

**Implementation Guidelines:**
- Inject repository via constructor: `private readonly I[Entity]Repository _repository;`
- All methods are async with `Async` suffix
- Use structured logging: `_logger.LogInformation("Getting {Entity} {Id}", id);`
- Throw appropriate exceptions:
  - `ArgumentException` for validation errors → 400
  - `InvalidOperationException` for business rule violations → 409
  - `UnauthorizedAccessException` for auth issues → 401/403

### 3. Add Controller Endpoint (API Layer)

Location: `src/backend/VicertHRLite.API/Controllers/{Feature}Controller.cs`

```csharp
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class [Feature]Controller : ControllerBase
{
    private readonly I[Feature]Service _service;
    private readonly ILogger<[Feature]Controller> _logger;

    public [Feature]Controller(
        I[Feature]Service service,
        ILogger<[Feature]Controller> logger)
    {
        _service = service;
        _logger = logger;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<[Entity]Dto>> Get(int id)
    {
        try
        {
            var result = await _service.Get[Entity]ByIdAsync(id);
            return Ok(result);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { Message = ex.Message });
        }
    }

    [HttpPost]
    public async Task<ActionResult<[Entity]Dto>> Create(Create[Entity]Dto dto)
    {
        try
        {
            var result = await _service.Create[Entity]Async(dto);
            return CreatedAtAction(nameof(Get), new { id = result.Id }, result);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { Message = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { Message = ex.Message });
        }
    }
}
```

**Controller Guidelines:**
- Controllers < 200 lines
- HTTP concerns only (no business logic)
- Use `[Authorize]` attribute
- Return `ActionResult<T>` for type safety
- Catch exceptions and map to HTTP status codes

### 4. Write Tests

Location: `src/backend/VicertHRLite.Tests/{Feature}/[Feature]ServiceTests.cs`

```csharp
using static VicertHRLite.Tests.Helpers.TestDataBuilders;
using VicertHRLite.Tests.Helpers;

public class [Feature]ServiceTests
{
    private readonly Mock<I[Entity]Repository> _mockRepository;
    private readonly Mock<ILogger<[Feature]Service>> _mockLogger;
    private readonly [Feature]Service _service;

    public [Feature]ServiceTests()
    {
        _mockRepository = new Mock<I[Entity]Repository>();
        _mockLogger = new Mock<ILogger<[Feature]Service>>();
        _service = new [Feature]Service(
            _mockRepository.Object,
            _mockLogger.Object);
    }

    [Fact]
    public async Task Get[Entity]ByIdAsync_ValidId_ReturnsEntity()
    {
        // Arrange
        var entity = Create[Entity](id: 1);
        _mockRepository.SetupGetById(1, entity);

        // Act
        var result = await _service.Get[Entity]ByIdAsync(1);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(1, result.Id);
    }

    [Fact]
    public async Task Get[Entity]ByIdAsync_InvalidId_ThrowsArgumentException()
    {
        // Arrange
        _mockRepository.SetupGetById(999, null);

        // Act & Assert
        await Assert.ThrowsAsync<ArgumentException>(
            () => _service.Get[Entity]ByIdAsync(999));
    }
}
```

**Test Guidelines:**
- Test file: `[ClassName]Tests.cs`
- Test method: `[Method]_[Scenario]_[ExpectedResult]`
- Use shared helpers from `VicertHRLite.Tests/Helpers/`
- Mock with Moq, assert with xUnit

## Output Checklist

After creating the endpoint:
1. [ ] DTOs created in Application/DTOs/
2. [ ] Service interface and implementation updated
3. [ ] Controller endpoint added
4. [ ] Tests written for service methods
5. [ ] Run `dotnet build` to verify compilation
6. [ ] Run `dotnet test` to verify tests pass
