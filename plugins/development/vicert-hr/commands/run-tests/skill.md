# Run Tests

Run backend and/or frontend tests for VicertHR.

**Options:** $ARGUMENTS

## Backend Tests

Location: `src/backend/VicertHRLite.Tests/`

### Run All Backend Tests

```bash
cd src/backend && dotnet test
```

### Run Specific Test Class

```bash
cd src/backend && dotnet test --filter "FullyQualifiedName~ClassName"
```

### Run Specific Test Method

```bash
cd src/backend && dotnet test --filter "FullyQualifiedName~ClassName.MethodName"
```

### Run with Verbose Output

```bash
cd src/backend && dotnet test --logger "console;verbosity=detailed"
```

## Frontend Tests

Location: `src/frontend/src/**/*.test.ts`

### Run All Frontend Tests

```bash
cd src/frontend && npm test
```

### Run Tests in Watch Mode

```bash
cd src/frontend && npm test -- --watch
```

### Run Specific Test File

```bash
cd src/frontend && npm test -- src/components/ComponentName.test.tsx
```

## Test Patterns

### Backend Test Structure

```csharp
public class ServiceTests
{
    private readonly Mock<IRepository> _mockRepo;
    private readonly Service _service;

    public ServiceTests()
    {
        _mockRepo = new Mock<IRepository>();
        _service = new Service(_mockRepo.Object);
    }

    [Fact]
    public async Task Method_Scenario_ExpectedResult()
    {
        // Arrange
        // Act
        // Assert
    }
}
```

### Using Shared Test Helpers

```csharp
using static VicertHRLite.Tests.Helpers.TestDataBuilders;
using VicertHRLite.Tests.Helpers;

// Create test data
var employee = CreateEmployee(id: 1, managerId: 2);
var leaveRequest = CreateLeaveRequest(employeeId: 1);

// Setup mocks fluently
_mockRepo.SetupGetById(1, employee).SetupUpdate();
```

## Common Test Commands

| Command | Purpose |
|---------|---------|
| `dotnet test` | Run all backend tests |
| `dotnet test --filter "Category=Unit"` | Run only unit tests |
| `dotnet test --filter "Category=Integration"` | Run only integration tests |
| `npm test` | Run all frontend tests |
| `npm test -- --coverage` | Run with coverage report |

## Troubleshooting

### Tests Failing After Changes

1. Check if the test expectations match new behavior
2. Verify mock setups are correct
3. Check for null reference issues

### Slow Tests

1. Use `--parallel` flag for backend
2. Mock external dependencies
3. Avoid database calls in unit tests

## Output

After running tests:
1. Report total tests run, passed, failed
2. List any failing tests with error messages
3. Suggest fixes for common failure patterns
