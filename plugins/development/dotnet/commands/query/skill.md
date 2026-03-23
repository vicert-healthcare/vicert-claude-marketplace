# Create MediatR Query

Create a MediatR query with handler and response DTO.

**Query for:** $ARGUMENTS

## Requirements

### 1. Determine Location

Place files in the Application layer following vertical slice structure:
```
src/[PROJECT_NAME].Application/Features/[Feature]/Queries/[QueryName]/
├── [QueryName]Query.cs
├── [QueryName]QueryHandler.cs
└── [Entity]Dto.cs (if not exists)
```

### 2. Create Query Record

```csharp
namespace [PROJECT_NAME].Application.Features.[Feature].Queries.[QueryName];

public record [QueryName]Query(
    // Add parameters: Id, filters, pagination
) : IRequest<Result<[ResponseType]>>;
```

**Common query types:**
- `GetByIdQuery(int Id)` - Single entity
- `GetAllQuery(int Page, int PageSize)` - Paginated list
- `SearchQuery(string Term, ...)` - Filtered search

### 3. Create Response DTO

```csharp
namespace [PROJECT_NAME].Application.Features.[Feature].Queries.[QueryName];

public record [Entity]Dto(
    int Id,
    string Property1,
    string Property2,
    DateTime CreatedAt
    // Map only what the client needs
);
```

**Guidelines:**
- Use record for immutability
- Only include properties needed by the client
- Flatten nested objects when appropriate
- Use appropriate types (don't expose internal IDs unnecessarily)

### 4. Create Handler

```csharp
namespace [PROJECT_NAME].Application.Features.[Feature].Queries.[QueryName];

public class [QueryName]QueryHandler(
    IApplicationDbContext context,
    IMapper mapper)
    : IRequestHandler<[QueryName]Query, Result<[ResponseType]>>
{
    public async Task<Result<[ResponseType]>> Handle(
        [QueryName]Query request,
        CancellationToken cancellationToken)
    {
        var entity = await context.[Entities]
            .AsNoTracking()  // Important for read-only queries
            .Where(e => e.Id == request.Id)
            .Select(e => new [Entity]Dto(
                e.Id,
                e.Property1,
                e.Property2,
                e.CreatedAt))
            .FirstOrDefaultAsync(cancellationToken);

        return entity is null
            ? Result<[ResponseType]>.Failure(Error.NotFound("[Entity]", request.Id))
            : Result<[ResponseType]>.Success(entity);
    }
}
```

**Guidelines:**
- Always use `AsNoTracking()` for queries
- Project to DTO in the query (Select) for efficiency
- Use Include() only when necessary
- Handle not found with Result pattern

### 5. Pagination Pattern (for list queries)

```csharp
public record GetUsersQuery(
    int Page = 1,
    int PageSize = 10,
    string? SearchTerm = null) : IRequest<Result<PagedList<UserDto>>>;

public class GetUsersQueryHandler(IApplicationDbContext context)
    : IRequestHandler<GetUsersQuery, Result<PagedList<UserDto>>>
{
    public async Task<Result<PagedList<UserDto>>> Handle(
        GetUsersQuery request,
        CancellationToken cancellationToken)
    {
        var query = context.Users.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(request.SearchTerm))
        {
            query = query.Where(u =>
                u.Name.Contains(request.SearchTerm) ||
                u.Email.Contains(request.SearchTerm));
        }

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderBy(u => u.Name)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(u => new UserDto(u.Id, u.Email, u.Name, u.CreatedAt))
            .ToListAsync(cancellationToken);

        return Result<PagedList<UserDto>>.Success(
            new PagedList<UserDto>(items, totalCount, request.Page, request.PageSize));
    }
}
```

## Output

After creating these files:
1. Show the complete code for all files
2. If using AutoMapper, show the mapping profile registration
3. Suggest corresponding endpoint/controller method

## Follow Patterns From

- Reference CLAUDE.md for conventions
- Follow existing query patterns in the project
- Use project's Result and PagedList implementations
