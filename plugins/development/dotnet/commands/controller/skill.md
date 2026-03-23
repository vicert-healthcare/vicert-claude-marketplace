# Create API Controller

Create an ASP.NET Core API controller with MediatR integration.

**Controller for:** $ARGUMENTS

## Requirements

### 1. Create Controller

Location: `src/[PROJECT_NAME].Api/Controllers/[Entity]Controller.cs`

```csharp
namespace [PROJECT_NAME].Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class [Entity]Controller(ISender sender) : ControllerBase
{
    /// <summary>
    /// Get all [entities] with pagination
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(PagedList<[Entity]Dto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        CancellationToken ct = default)
    {
        var result = await sender.Send(
            new Get[Entity]sQuery(page, pageSize), ct);

        return result.Match<IActionResult>(
            success => Ok(success),
            error => BadRequest(error));
    }

    /// <summary>
    /// Get [entity] by ID
    /// </summary>
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof([Entity]Dto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(
        int id,
        CancellationToken ct = default)
    {
        var result = await sender.Send(
            new Get[Entity]ByIdQuery(id), ct);

        return result.Match<IActionResult>(
            success => Ok(success),
            error => error.Code == "NotFound"
                ? NotFound()
                : BadRequest(error));
    }

    /// <summary>
    /// Create new [entity]
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(int), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create(
        [FromBody] Create[Entity]Command command,
        CancellationToken ct = default)
    {
        var result = await sender.Send(command, ct);

        return result.Match<IActionResult>(
            id => CreatedAtAction(nameof(GetById), new { id }, id),
            error => BadRequest(error));
    }

    /// <summary>
    /// Update existing [entity]
    /// </summary>
    [HttpPut("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Update(
        int id,
        [FromBody] Update[Entity]Command command,
        CancellationToken ct = default)
    {
        if (id != command.Id)
            return BadRequest("ID mismatch");

        var result = await sender.Send(command, ct);

        return result.Match<IActionResult>(
            _ => NoContent(),
            error => error.Code == "NotFound"
                ? NotFound()
                : BadRequest(error));
    }

    /// <summary>
    /// Delete [entity]
    /// </summary>
    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(
        int id,
        CancellationToken ct = default)
    {
        var result = await sender.Send(
            new Delete[Entity]Command(id), ct);

        return result.Match<IActionResult>(
            _ => NoContent(),
            error => error.Code == "NotFound"
                ? NotFound()
                : BadRequest(error));
    }
}
```

### 2. Key Guidelines

**Controller responsibilities:**
- Route HTTP requests to MediatR handlers
- Map HTTP semantics (status codes, headers)
- Handle content negotiation
- NO business logic in controllers

**Attributes to include:**
- `[ApiController]` - Enables automatic model validation
- `[Route]` - Define route template
- `[Produces]` - Document content type
- `[ProducesResponseType]` - Document possible responses
- `[HttpGet/Post/Put/Delete]` - HTTP method mapping

**Best practices:**
- Use `ISender` (not `IMediator`) for sending only
- Always include `CancellationToken`
- Use `CreatedAtAction` for POST responses
- Map Result pattern to appropriate HTTP status codes

### 3. Alternative: Request/Response DTOs

If not using MediatR commands directly as request bodies:

```csharp
public record Create[Entity]Request(string Property1, string Property2);

[HttpPost]
public async Task<IActionResult> Create(
    [FromBody] Create[Entity]Request request,
    CancellationToken ct = default)
{
    var command = new Create[Entity]Command(
        request.Property1,
        request.Property2);

    var result = await sender.Send(command, ct);
    // ...
}
```

## Output

After creating:
1. Show the complete controller code
2. List required using statements
3. Note any commands/queries that need to be created
4. Remind about Swagger/OpenAPI documentation

## Follow Patterns From

- Reference CLAUDE.md for conventions
- Follow existing controller patterns in the project
- Match project's Result pattern handling
