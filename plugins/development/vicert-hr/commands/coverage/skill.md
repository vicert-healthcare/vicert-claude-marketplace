# Check Test Coverage

Analyze test coverage and identify gaps in VicertHR.

## Run Coverage Report

```bash
./scripts/run-coverage.sh
```

This opens an HTML report in your browser with detailed line-by-line coverage.

## Current Coverage Status

| Service | Coverage | Tests |
|---------|----------|-------|
| FileManagementService | 100% | 41 |
| ReportService | 100% | 16 |
| ExcelReportService | 100% | 17 |
| DateOverlapCalculator | 100% | 19 |
| LeaveRequestService | 77% | 31 |

**Overall Metrics:** Line 18.3%, Branch 37.5%, Method 57.6% (376 total tests)

## Focus Areas for Improvement

Services with low/no coverage that should be prioritized:

1. **EmployeeService** - Core functionality
2. **LeaveBalanceService** - Business-critical calculations
3. **NotificationService** - Email notifications
4. **AuditService** - Audit logging
5. **PermissionService** - Authorization checks

## Coverage Best Practices

### What to Test

1. **Happy path** - Normal successful operations
2. **Edge cases** - Boundary conditions, null inputs
3. **Error conditions** - What happens when things fail
4. **Business rules** - Validation, calculations

### What NOT to Focus On

1. Simple getters/setters
2. Auto-generated code
3. Third-party library wrappers
4. Configuration classes

## Writing Tests to Improve Coverage

### Using Shared Test Helpers

```csharp
using static VicertHRLite.Tests.Helpers.TestDataBuilders;
using VicertHRLite.Tests.Helpers;

// Factory methods available:
CreateEmployee(id, managerId, email, department, ...)
CreateLeaveRequest(employeeId, startDate, endDate, ...)
CreateLeaveBalance(employeeId, leaveTypeId, balance, ...)

// Fluent mock setups:
_mockRepo.SetupGetById(id, entity)
_mockRepo.SetupUpdate()
_mockRepo.SetupCreate(returnEntity)
```

### Test Method Naming

```
[Method]_[Scenario]_[ExpectedResult]

Examples:
- GetEmployeeAsync_ValidId_ReturnsEmployee
- CreateLeaveRequestAsync_OverlappingDates_ThrowsException
- CalculateBalance_NegativeResult_ReturnsZero
```

## Analyzing the Report

The HTML coverage report shows:

1. **Summary** - Overall line, branch, method coverage
2. **Per-file breakdown** - Coverage for each source file
3. **Line highlighting** - Green (covered), Red (not covered), Yellow (partial)

### Interpreting Results

- **Line coverage** - Percentage of lines executed by tests
- **Branch coverage** - Percentage of if/else branches tested
- **Method coverage** - Percentage of methods called by tests

## Output

After running coverage:
1. Current coverage percentages
2. Files with lowest coverage
3. Specific methods/branches that need tests
4. Suggested tests to write (based on uncovered code)
