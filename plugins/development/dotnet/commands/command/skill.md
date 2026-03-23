# Create MediatR Command

Create a MediatR command with handler and FluentValidation validator.

**Command for:** $ARGUMENTS

## Requirements

### 1. Determine Location

Place files in the Application layer following vertical slice structure:
```
src/[PROJECT_NAME].Application/Features/[Feature]/Commands/[CommandName]/
├── [CommandName]Command.cs
├── [CommandName]CommandHandler.cs
└── [CommandName]CommandValidator.cs
```

### 2. Create Command Record

```csharp
namespace [PROJECT_NAME].Application.Features.[Feature].Commands.[CommandName];

public record [CommandName]Command(
    // Add required properties based on the operation
) : IRequest<Result<[ReturnType]>>;
```

**Guidelines:**
- Use record with primary constructor
- Implement `IRequest<Result<T>>` for Result pattern
- Use meaningful property names
- Include all data needed for the operation

### 3. Create Validator

```csharp
namespace [PROJECT_NAME].Application.Features.[Feature].Commands.[CommandName];

public class [CommandName]CommandValidator : AbstractValidator<[CommandName]Command>
{
    public [CommandName]CommandValidator(IApplicationDbContext context)
    {
        // Add validation rules
        RuleFor(x => x.PropertyName)
            .NotEmpty()
            .WithMessage("PropertyName is required");

        // Async validation for uniqueness
        RuleFor(x => x.Email)
            .MustAsync(async (email, ct) =>
                !await context.Users.AnyAsync(u => u.Email == email, ct))
            .WithMessage("Email already exists");
    }
}
```

**Guidelines:**
- Validate all business rules here, not in handler
- Use async validation for database checks
- Provide clear error messages
- Inject `IApplicationDbContext` if needed for uniqueness checks

### 4. Create Handler

```csharp
namespace [PROJECT_NAME].Application.Features.[Feature].Commands.[CommandName];

public class [CommandName]CommandHandler(
    IApplicationDbContext context,
    ILogger<[CommandName]CommandHandler> logger)
    : IRequestHandler<[CommandName]Command, Result<[ReturnType]>>
{
    public async Task<Result<[ReturnType]>> Handle(
        [CommandName]Command request,
        CancellationToken cancellationToken)
    {
        // Implement command logic
        // 1. Create/modify entity
        // 2. Save changes
        // 3. Return result

        await context.SaveChangesAsync(cancellationToken);

        return Result<[ReturnType]>.Success(value);
    }
}
```

**Guidelines:**
- Use primary constructor for dependencies
- Always include `CancellationToken`
- Use Result pattern for return type
- Keep handler focused on single responsibility
- Log important operations

## Output

After creating these files:
1. Show the complete code for all three files
2. Remind to register validators: `services.AddValidatorsFromAssembly()`
3. Note that validation runs automatically via pipeline behavior

## Follow Patterns From

- Reference CLAUDE.md for naming conventions
- Follow existing command patterns in the project
- Use project's Result pattern implementation
