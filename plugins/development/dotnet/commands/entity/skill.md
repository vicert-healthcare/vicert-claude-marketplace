# Create Domain Entity

Create a domain entity with EF Core configuration and optional repository.

**Entity for:** $ARGUMENTS

## Requirements

### 1. Create Domain Entity

Location: `src/[PROJECT_NAME].Domain/Entities/[EntityName].cs`

```csharp
namespace [PROJECT_NAME].Domain.Entities;

public class [EntityName]
{
    public int Id { get; private set; }

    public required string Property1 { get; set; }
    public required string Property2 { get; set; }

    // Audit properties (if using base class, inherit instead)
    public DateTime CreatedAt { get; set; }
    public DateTime? ModifiedAt { get; set; }

    // Navigation properties
    public int RelatedEntityId { get; set; }
    public RelatedEntity RelatedEntity { get; set; } = null!;

    public ICollection<ChildEntity> Children { get; set; } = [];
}
```

**Guidelines:**
- Use `required` for properties that must be set
- Use private setter for Id (database generates)
- Initialize collections with `= []`
- Use `= null!` for required navigation properties

### 2. Create EF Core Configuration

Location: `src/[PROJECT_NAME].Infrastructure/Data/Configurations/[EntityName]Configuration.cs`

```csharp
namespace [PROJECT_NAME].Infrastructure.Data.Configurations;

public class [EntityName]Configuration : IEntityTypeConfiguration<[EntityName]>
{
    public void Configure(EntityTypeBuilder<[EntityName]> builder)
    {
        builder.ToTable("[EntityName]s");

        // Primary key
        builder.HasKey(e => e.Id);

        // Properties
        builder.Property(e => e.Property1)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(e => e.Property2)
            .IsRequired()
            .HasMaxLength(256);

        // Indexes
        builder.HasIndex(e => e.Property1)
            .IsUnique();

        // Relationships
        builder.HasOne(e => e.RelatedEntity)
            .WithMany(r => r.[EntityName]s)
            .HasForeignKey(e => e.RelatedEntityId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(e => e.Children)
            .WithOne(c => c.[EntityName])
            .HasForeignKey(c => c.[EntityName]Id)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
```

**Guidelines:**
- Always specify table name explicitly
- Configure max lengths for strings
- Add indexes for frequently queried columns
- Specify cascade behavior for relationships

### 3. Add DbSet to ApplicationDbContext

Location: `src/[PROJECT_NAME].Infrastructure/Data/ApplicationDbContext.cs`

```csharp
public DbSet<[EntityName]> [EntityName]s => Set<[EntityName]>();
```

### 4. Create Migration

Run this command after creating the entity:

```bash
dotnet ef migrations add Add[EntityName] \
    --project src/[PROJECT_NAME].Infrastructure \
    --startup-project src/[PROJECT_NAME].Api
```

Then apply:

```bash
dotnet ef database update \
    --project src/[PROJECT_NAME].Infrastructure \
    --startup-project src/[PROJECT_NAME].Api
```

### 5. Optional: Create Repository (if using repository pattern)

Location: `src/[PROJECT_NAME].Infrastructure/Data/Repositories/[EntityName]Repository.cs`

```csharp
namespace [PROJECT_NAME].Infrastructure.Data.Repositories;

public class [EntityName]Repository(ApplicationDbContext context)
    : I[EntityName]Repository
{
    public async Task<[EntityName]?> GetByIdAsync(
        int id,
        CancellationToken cancellationToken = default) =>
        await context.[EntityName]s
            .FirstOrDefaultAsync(e => e.Id == id, cancellationToken);

    public async Task<IReadOnlyList<[EntityName]>> GetAllAsync(
        CancellationToken cancellationToken = default) =>
        await context.[EntityName]s
            .ToListAsync(cancellationToken);

    public void Add([EntityName] entity) =>
        context.[EntityName]s.Add(entity);

    public void Update([EntityName] entity) =>
        context.[EntityName]s.Update(entity);

    public void Remove([EntityName] entity) =>
        context.[EntityName]s.Remove(entity);
}
```

Interface in Application layer:
`src/[PROJECT_NAME].Application/Common/Interfaces/I[EntityName]Repository.cs`

```csharp
namespace [PROJECT_NAME].Application.Common.Interfaces;

public interface I[EntityName]Repository
{
    Task<[EntityName]?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<[EntityName]>> GetAllAsync(CancellationToken cancellationToken = default);
    void Add([EntityName] entity);
    void Update([EntityName] entity);
    void Remove([EntityName] entity);
}
```

Register in DI:
```csharp
services.AddScoped<I[EntityName]Repository, [EntityName]Repository>();
```

## Output

After creating:
1. Show all created files
2. Provide the migration commands
3. If repository created, show DI registration
4. Suggest next steps: create Commands/Queries for this entity

## Follow Patterns From

- Reference CLAUDE.md for naming conventions
- Follow existing entity patterns in the project
- Check if project uses repository pattern or direct DbContext
