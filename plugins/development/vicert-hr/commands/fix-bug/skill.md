# Fix Bug Workflow

Guided workflow for investigating and fixing bugs in VicertHR.

**Bug description:** $ARGUMENTS

## Step 1: Understand the Bug

Before writing any code:

1. **Reproduce the issue** - Can you trigger the bug?
2. **Identify the symptoms** - What exactly is failing?
3. **Check the logs** - Any errors in browser console or server logs?

Questions to ask:
- Is this a frontend or backend issue?
- Does it affect all users or specific scenarios?
- When did it start happening? (recent changes?)

## Step 2: Locate the Problem

### For Backend Issues

Check these locations:
```
src/backend/VicertHRLite.API/Controllers/     # HTTP layer
src/backend/VicertHRLite.Application/Services/ # Business logic
src/backend/VicertHRLite.Infrastructure/       # Data access, external services
```

Common issues:
- **400 Bad Request** → Check validation in service layer
- **409 Conflict** → Check business rules in service
- **500 Internal Server Error** → Check exception handling, null refs
- **Data not saving** → Check repository, DbContext, transactions

### For Frontend Issues

Check these locations:
```
src/frontend/src/components/    # UI components
src/frontend/src/hooks/         # useFormHandler, useDataLoader
src/frontend/src/utils/api.ts   # API calls
```

Common issues:
- **Form not submitting** → Check useFormHandler validation
- **Data not loading** → Check useDataLoader, API endpoint
- **UI not updating** → Check state management, re-renders
- **Styling broken** → Check Tailwind classes

## Step 3: Fix the Bug

### Backend Fix Pattern

```csharp
// Before fixing, read the existing code to understand the pattern
// Follow existing error handling:

try
{
    // Fix goes here
}
catch (ArgumentException ex)
{
    return BadRequest(new { Message = ex.Message });
}
catch (InvalidOperationException ex)
{
    return Conflict(new { Message = ex.Message });
}
```

### Frontend Fix Pattern

```tsx
// Before fixing, check how similar components handle the case
// Use existing hooks and patterns:

const { data, loading, error } = useDataLoader(...);

if (error) {
  // Handle error appropriately
}
```

## Step 4: Write/Update Tests

**Always add a test that would have caught the bug.**

```csharp
[Fact]
public async Task MethodName_ScenarioThatCausedBug_ShouldHandleCorrectly()
{
    // Arrange - Set up the conditions that triggered the bug

    // Act - Perform the action

    // Assert - Verify the fix works
}
```

Test naming: `[Method]_[Scenario]_[ExpectedResult]`

## Step 5: Verify the Fix

1. **Run the tests**
   ```bash
   cd src/backend && dotnet test
   cd src/frontend && npm test
   ```

2. **Test manually** - Reproduce the original bug, confirm it's fixed

3. **Check for regressions** - Did the fix break anything else?

## Common VicertHR Bug Patterns

### Leave Balance Issues
- Check `LeaveBalanceService` and `LeaveRequestService`
- Verify date calculations in `DateOverlapCalculator`
- Check holiday handling

### Authentication Issues
- Check JWT token handling in `AuthContext`
- Verify cookie settings (httpOnly, secure)
- Check authorization attributes on controllers

### Data Display Issues
- Check DTO mappings in services
- Verify null handling in responses
- Check frontend type definitions match backend DTOs

## Output Checklist

After fixing the bug:
1. [ ] Root cause identified and documented
2. [ ] Fix implemented following existing patterns
3. [ ] Test added to prevent regression
4. [ ] All existing tests pass
5. [ ] Manual testing confirms fix
6. [ ] No new issues introduced
