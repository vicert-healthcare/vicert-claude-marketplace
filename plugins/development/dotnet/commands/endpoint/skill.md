# Create Minimal API Endpoints

Create Minimal API endpoint group with MediatR integration.

**Endpoints for:** $ARGUMENTS

## Requirements

### 1. Create Endpoint Class

Location: `src/[PROJECT_NAME].Api/Endpoints/[Entity]Endpoints.cs`

```csharp
namespace [PROJECT_NAME].Api.Endpoints;

public static class [Entity]Endpoints
{
    public static void Map[Entity]Endpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/[entities]")
            .WithTags("[Entities]")
            .WithOpenApi();

        group.MapGet("/", GetAll)
            .WithName("Get[Entities]")
            .WithSummary("Get all [entities] with pagination")
            .Produces<PagedList<[Entity]Dto>>();

        group.MapGet("/{id:int}", GetById)
            .WithName("Get[Entity]ById")
            .WithSummary("Get [entity] by ID")
            .Produces<[Entity]Dto>()
            .Produces(StatusCodes.Status404NotFound);

        group.MapPost("/", Create)
            .WithName("Create[Entity]")
            .WithSummary("Create a new [entity]")
            .Produces<int>(StatusCodes.Status201Created)
            .Produces<ProblemDetails>(StatusCodes.Status400BadRequest);

        group.MapPut("/{id:int}", Update)
            .WithName("Update[Entity]")
            .WithSummary("Update an existing [entity]")
            .Produces(StatusCodes.Status204NoContent)
            .Produces(StatusCodes.Status404NotFound)
            .Produces<ProblemDetails>(StatusCodes.Status400BadRequest);

        group.MapDelete("/{id:int}", Delete)
            .WithName("Delete[Entity]")
            .WithSummary("Delete an [entity]")
            .Produces(StatusCodes.Status204NoContent)
            .Produces(StatusCodes.Status404NotFound);
    }

    private static async Task<IResult> GetAll(
        [AsParameters] PaginationParams pagination,
        ISender sender,
        CancellationToken ct)
    {
        var result = await sender.Send(
            new Get[Entities]Query(pagination.Page, pagination.PageSize), ct);

        return result.Match(
            success => Results.Ok(success),
            error => Results.BadRequest(error));
    }

    private static async Task<IResult> GetById(
        int id,
        ISender sender,
        CancellationToken ct)
    {
        var result = await sender.Send(new Get[Entity]ByIdQuery(id), ct);

        return result.Match(
            success => Results.Ok(success),
            error => error.Code == "NotFound"
                ? Results.NotFound()
                : Results.BadRequest(error));
    }

    private static async Task<IResult> Create(
        Create[Entity]Command command,
        ISender sender,
        CancellationToken ct)
    {
        var result = await sender.Send(command, ct);

        return result.Match(
            id => Results.Created($"/api/[entities]/{id}", id),
            error => Results.BadRequest(error));
    }

    private static async Task<IResult> Update(
        int id,
        Update[Entity]Command command,
        ISender sender,
        CancellationToken ct)
    {
        if (id != command.Id)
            return Results.BadRequest("ID mismatch");

        var result = await sender.Send(command, ct);

        return result.Match(
            _ => Results.NoContent(),
            error => error.Code == "NotFound"
                ? Results.NotFound()
                : Results.BadRequest(error));
    }

    private static async Task<IResult> Delete(
        int id,
        ISender sender,
        CancellationToken ct)
    {
        var result = await sender.Send(new Delete[Entity]Command(id), ct);

        return result.Match(
            _ => Results.NoContent(),
            error => error.Code == "NotFound"
                ? Results.NotFound()
                : Results.BadRequest(error));
    }
}

// Helper for pagination parameters
public record PaginationParams(int Page = 1, int PageSize = 10);
```

### 2. Register in Program.cs

```csharp
// In Program.cs, after app is built
app.Map[Entity]Endpoints();
```

### 3. Key Guidelines

**Endpoint organization:**
- One static class per feature/entity
- Use `MapGroup()` for route prefix and shared config
- Private static methods for handlers
- Extension method pattern for registration

**OpenAPI documentation:**
- `WithTags()` - Group in Swagger UI
- `WithName()` - Operation ID for clients
- `WithSummary()` - Short description
- `WithDescription()` - Detailed description
- `Produces<T>()` - Document response types

**Parameter binding:**
- Route params: `{id:int}` with method parameter
- Query params: Use `[AsParameters]` for complex params
- Body: Automatic for complex types in POST/PUT
- Services: Injected automatically (ISender, etc.)

### 4. With Authentication/Authorization

```csharp
public static void Map[Entity]Endpoints(this IEndpointRouteBuilder app)
{
    var group = app.MapGroup("/api/[entities]")
        .WithTags("[Entities]")
        .RequireAuthorization()  // All endpoints require auth
        .WithOpenApi();

    // Public endpoint (override group setting)
    group.MapGet("/public", GetPublicData)
        .AllowAnonymous();

    // Specific policy
    group.MapDelete("/{id:int}", Delete)
        .RequireAuthorization("AdminOnly");
}
```

### 5. With Validation Filter

```csharp
// Add validation filter for all endpoints
var group = app.MapGroup("/api/[entities]")
    .AddEndpointFilter<ValidationFilter>()
    .WithTags("[Entities]");
```

## Output

After creating:
1. Show the complete endpoint class
2. Show the Program.cs registration line
3. List required using statements
4. Note any commands/queries that need to be created

## Follow Patterns From

- Reference CLAUDE.md for conventions
- Follow existing endpoint patterns in the project
- Match project's Result pattern handling
