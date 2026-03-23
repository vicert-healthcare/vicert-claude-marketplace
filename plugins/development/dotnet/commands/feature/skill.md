# Scaffold Complete Feature

Scaffold a complete vertical slice feature with CQRS pattern.

**Feature for:** $ARGUMENTS

## What This Creates

A complete feature implementation across all layers:

```
src/
├── [PROJECT_NAME].Domain/
│   └── Entities/
│       └── [Entity].cs
│
├── [PROJECT_NAME].Application/
│   └── Features/
│       └── [Feature]/
│           ├── Commands/
│           │   ├── Create[Entity]/
│           │   │   ├── Create[Entity]Command.cs
│           │   │   ├── Create[Entity]CommandHandler.cs
│           │   │   └── Create[Entity]CommandValidator.cs
│           │   ├── Update[Entity]/
│           │   │   ├── Update[Entity]Command.cs
│           │   │   ├── Update[Entity]CommandHandler.cs
│           │   │   └── Update[Entity]CommandValidator.cs
│           │   └── Delete[Entity]/
│           │       ├── Delete[Entity]Command.cs
│           │       └── Delete[Entity]CommandHandler.cs
│           └── Queries/
│               ├── Get[Entity]ById/
│               │   ├── Get[Entity]ByIdQuery.cs
│               │   ├── Get[Entity]ByIdQueryHandler.cs
│               │   └── [Entity]Dto.cs
│               └── Get[Entities]/
│                   ├── Get[Entities]Query.cs
│                   └── Get[Entities]QueryHandler.cs
│
├── [PROJECT_NAME].Infrastructure/
│   └── Data/
│       └── Configurations/
│           └── [Entity]Configuration.cs
│
└── [PROJECT_NAME].Api/
    └── Endpoints/
        └── [Entity]Endpoints.cs

tests/
├── [PROJECT_NAME].Application.Tests/
│   └── Features/
│       └── [Feature]/
│           └── Commands/
│               └── Create[Entity]CommandHandlerTests.cs
│
└── [PROJECT_NAME].Api.Tests/
    └── [Entity]EndpointsTests.cs
```

## Requirements

### Step 1: Create Domain Entity

```csharp
// src/[PROJECT_NAME].Domain/Entities/[Entity].cs
namespace [PROJECT_NAME].Domain.Entities;

public class [Entity]
{
    public int Id { get; private set; }

    // Add entity properties based on feature requirements
    public required string Name { get; set; }
    public string? Description { get; set; }

    // Audit properties
    public DateTime CreatedAt { get; set; }
    public DateTime? ModifiedAt { get; set; }
    public string? CreatedBy { get; set; }
    public string? ModifiedBy { get; set; }
}
```

### Step 2: Create EF Core Configuration

```csharp
// src/[PROJECT_NAME].Infrastructure/Data/Configurations/[Entity]Configuration.cs
namespace [PROJECT_NAME].Infrastructure.Data.Configurations;

public class [Entity]Configuration : IEntityTypeConfiguration<[Entity]>
{
    public void Configure(EntityTypeBuilder<[Entity]> builder)
    {
        builder.ToTable("[Entity]s");
        builder.HasKey(e => e.Id);

        builder.Property(e => e.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(e => e.Description)
            .HasMaxLength(500);

        // Add indexes, relationships as needed
    }
}
```

Add DbSet to ApplicationDbContext:
```csharp
public DbSet<[Entity]> [Entity]s => Set<[Entity]>();
```

### Step 3: Create DTO

```csharp
// src/[PROJECT_NAME].Application/Features/[Feature]/Queries/Get[Entity]ById/[Entity]Dto.cs
namespace [PROJECT_NAME].Application.Features.[Feature].Queries;

public record [Entity]Dto(
    int Id,
    string Name,
    string? Description,
    DateTime CreatedAt
);
```

### Step 4: Create Commands

**Create Command:**
```csharp
public record Create[Entity]Command(
    string Name,
    string? Description
) : IRequest<Result<int>>;

public class Create[Entity]CommandValidator : AbstractValidator<Create[Entity]Command>
{
    public Create[Entity]CommandValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Description).MaximumLength(500);
    }
}

public class Create[Entity]CommandHandler(IApplicationDbContext context)
    : IRequestHandler<Create[Entity]Command, Result<int>>
{
    public async Task<Result<int>> Handle(
        Create[Entity]Command request,
        CancellationToken cancellationToken)
    {
        var entity = new [Entity]
        {
            Name = request.Name,
            Description = request.Description,
            CreatedAt = DateTime.UtcNow
        };

        context.[Entity]s.Add(entity);
        await context.SaveChangesAsync(cancellationToken);

        return Result<int>.Success(entity.Id);
    }
}
```

**Update Command:**
```csharp
public record Update[Entity]Command(
    int Id,
    string Name,
    string? Description
) : IRequest<Result>;

public class Update[Entity]CommandHandler(IApplicationDbContext context)
    : IRequestHandler<Update[Entity]Command, Result>
{
    public async Task<Result> Handle(
        Update[Entity]Command request,
        CancellationToken cancellationToken)
    {
        var entity = await context.[Entity]s
            .FirstOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

        if (entity is null)
            return Result.Failure(Error.NotFound("[Entity]", request.Id));

        entity.Name = request.Name;
        entity.Description = request.Description;
        entity.ModifiedAt = DateTime.UtcNow;

        await context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
```

**Delete Command:**
```csharp
public record Delete[Entity]Command(int Id) : IRequest<Result>;

public class Delete[Entity]CommandHandler(IApplicationDbContext context)
    : IRequestHandler<Delete[Entity]Command, Result>
{
    public async Task<Result> Handle(
        Delete[Entity]Command request,
        CancellationToken cancellationToken)
    {
        var entity = await context.[Entity]s
            .FirstOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

        if (entity is null)
            return Result.Failure(Error.NotFound("[Entity]", request.Id));

        context.[Entity]s.Remove(entity);
        await context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
```

### Step 5: Create Queries

**Get By Id:**
```csharp
public record Get[Entity]ByIdQuery(int Id) : IRequest<Result<[Entity]Dto>>;

public class Get[Entity]ByIdQueryHandler(IApplicationDbContext context)
    : IRequestHandler<Get[Entity]ByIdQuery, Result<[Entity]Dto>>
{
    public async Task<Result<[Entity]Dto>> Handle(
        Get[Entity]ByIdQuery request,
        CancellationToken cancellationToken)
    {
        var entity = await context.[Entity]s
            .AsNoTracking()
            .Where(e => e.Id == request.Id)
            .Select(e => new [Entity]Dto(
                e.Id, e.Name, e.Description, e.CreatedAt))
            .FirstOrDefaultAsync(cancellationToken);

        return entity is null
            ? Result<[Entity]Dto>.Failure(Error.NotFound("[Entity]", request.Id))
            : Result<[Entity]Dto>.Success(entity);
    }
}
```

**Get All (Paginated):**
```csharp
public record Get[Entities]Query(
    int Page = 1,
    int PageSize = 10
) : IRequest<Result<PagedList<[Entity]Dto>>>;

public class Get[Entities]QueryHandler(IApplicationDbContext context)
    : IRequestHandler<Get[Entities]Query, Result<PagedList<[Entity]Dto>>>
{
    public async Task<Result<PagedList<[Entity]Dto>>> Handle(
        Get[Entities]Query request,
        CancellationToken cancellationToken)
    {
        var query = context.[Entity]s.AsNoTracking();

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(e => e.CreatedAt)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(e => new [Entity]Dto(
                e.Id, e.Name, e.Description, e.CreatedAt))
            .ToListAsync(cancellationToken);

        return Result<PagedList<[Entity]Dto>>.Success(
            new PagedList<[Entity]Dto>(
                items, totalCount, request.Page, request.PageSize));
    }
}
```

### Step 6: Create Endpoints

```csharp
// src/[PROJECT_NAME].Api/Endpoints/[Entity]Endpoints.cs
public static class [Entity]Endpoints
{
    public static void Map[Entity]Endpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/[entities]")
            .WithTags("[Entities]")
            .WithOpenApi();

        group.MapGet("/", GetAll);
        group.MapGet("/{id:int}", GetById);
        group.MapPost("/", Create);
        group.MapPut("/{id:int}", Update);
        group.MapDelete("/{id:int}", Delete);
    }

    // Implement endpoint handlers (see /dotnet/endpoint command)
}
```

Register in Program.cs:
```csharp
app.Map[Entity]Endpoints();
```

### Step 7: Create Unit Tests

Create handler tests for Create command (see /dotnet/test command).

### Step 8: Create Integration Tests

Create endpoint tests (see /dotnet/integration-test command).

## After Scaffolding

Run these commands:

```bash
# Create migration
dotnet ef migrations add Add[Entity] \
    --project src/[PROJECT_NAME].Infrastructure \
    --startup-project src/[PROJECT_NAME].Api

# Apply migration
dotnet ef database update \
    --project src/[PROJECT_NAME].Infrastructure \
    --startup-project src/[PROJECT_NAME].Api

# Build and test
dotnet build
dotnet test
```

## Output

Create all files listed above with:
1. Complete, working code
2. Proper namespaces matching folder structure
3. All imports/usings
4. Following project conventions from CLAUDE.md

## Follow Patterns From

- Reference CLAUDE.md for all conventions
- Follow existing feature patterns in the project
- Match project's Result pattern and error handling
