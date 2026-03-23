# Create MediatR Handler

Create a generic MediatR handler for custom request types.

**Handler for:** $ARGUMENTS

## Determine Handler Type

First, identify what type of handler is needed:

| Type | Use Case | Return Type |
|------|----------|-------------|
| Command | Write operation (create, update, delete) | `Result<T>` or `Result` |
| Query | Read operation (get, search, list) | `Result<TDto>` or `Result<PagedList<TDto>>` |
| Notification | Fire-and-forget events | `void` (Task) |

## Requirements

### Option 1: Standard Request Handler

```csharp
namespace [PROJECT_NAME].Application.Features.[Feature].[Commands/Queries].[Name];

// Request definition
public record [Name]Request(
    // Parameters
) : IRequest<Result<[ResponseType]>>;

// Handler
public class [Name]RequestHandler(
    IApplicationDbContext context,
    ILogger<[Name]RequestHandler> logger)
    : IRequestHandler<[Name]Request, Result<[ResponseType]>>
{
    public async Task<Result<[ResponseType]>> Handle(
        [Name]Request request,
        CancellationToken cancellationToken)
    {
        logger.LogInformation("Handling {Request}", typeof([Name]Request).Name);

        // Implementation

        return Result<[ResponseType]>.Success(result);
    }
}
```

### Option 2: Notification Handler (Events)

```csharp
namespace [PROJECT_NAME].Application.Features.[Feature].Events;

// Notification definition
public record [Name]Notification(
    int EntityId,
    string ActionType,
    DateTime OccurredAt
) : INotification;

// Handler (can have multiple handlers for same notification)
public class [Name]NotificationHandler(
    ILogger<[Name]NotificationHandler> logger,
    IEmailService emailService)
    : INotificationHandler<[Name]Notification>
{
    public async Task Handle(
        [Name]Notification notification,
        CancellationToken cancellationToken)
    {
        logger.LogInformation(
            "Handling notification for entity {Id}",
            notification.EntityId);

        // Handle the notification (send email, update cache, etc.)
        await emailService.SendAsync(..., cancellationToken);
    }
}
```

### Option 3: Stream Request Handler

```csharp
namespace [PROJECT_NAME].Application.Features.[Feature].Queries;

// Stream request
public record Get[Entities]StreamQuery(
    int BatchSize = 100
) : IStreamRequest<[Entity]Dto>;

// Handler
public class Get[Entities]StreamQueryHandler(
    IApplicationDbContext context)
    : IStreamRequestHandler<Get[Entities]StreamQuery, [Entity]Dto>
{
    public async IAsyncEnumerable<[Entity]Dto> Handle(
        Get[Entities]StreamQuery request,
        [EnumeratorCancellation] CancellationToken cancellationToken)
    {
        await foreach (var entity in context.[Entities]
            .AsNoTracking()
            .AsAsyncEnumerable()
            .WithCancellation(cancellationToken))
        {
            yield return new [Entity]Dto(
                entity.Id,
                entity.Name
                // ...
            );
        }
    }
}
```

## Handler Guidelines

### Dependencies

```csharp
public class MyHandler(
    IApplicationDbContext context,    // Database access
    IMapper mapper,                   // Object mapping
    ILogger<MyHandler> logger,        // Logging
    ICurrentUserService currentUser,  // Current user info
    IDateTimeService dateTime)        // Testable date/time
    : IRequestHandler<MyRequest, Result<MyResponse>>
```

### Error Handling

```csharp
public async Task<Result<Response>> Handle(
    Request request,
    CancellationToken cancellationToken)
{
    // Check preconditions
    var entity = await context.Entities
        .FirstOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

    if (entity is null)
        return Result<Response>.Failure(
            Error.NotFound("Entity", request.Id));

    // Check authorization
    if (entity.OwnerId != currentUser.UserId)
        return Result<Response>.Failure(
            Error.Forbidden("Not authorized to access this resource"));

    // Perform operation
    try
    {
        // ... implementation
        return Result<Response>.Success(response);
    }
    catch (DomainException ex)
    {
        return Result<Response>.Failure(
            Error.Domain(ex.Message));
    }
}
```

### Unit of Work Pattern

```csharp
public async Task<Result<int>> Handle(
    CreateOrderCommand request,
    CancellationToken cancellationToken)
{
    // Multiple operations in single transaction
    var order = new Order { /* ... */ };
    context.Orders.Add(order);

    var inventory = await context.Inventory
        .FirstAsync(i => i.ProductId == request.ProductId, cancellationToken);
    inventory.Quantity -= request.Quantity;

    // Single SaveChanges commits both
    await context.SaveChangesAsync(cancellationToken);

    // Publish notification after successful save
    await sender.Publish(
        new OrderCreatedNotification(order.Id),
        cancellationToken);

    return Result<int>.Success(order.Id);
}
```

## Output

After creating:
1. Show the complete request/notification record
2. Show the complete handler class
3. Show validator if it's a command
4. Note registration requirements (usually automatic with assembly scanning)

## Follow Patterns From

- Reference CLAUDE.md for conventions
- Follow existing handler patterns in the project
- Match project's Result pattern and error handling
