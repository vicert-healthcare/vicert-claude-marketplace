# Onboard to VicertHR Lite

Get oriented with the VicertHR Lite Platform codebase.

## Overview

VicertHR Lite is a production HR management platform replacing BambooHR for Vicert Healthcare. It has 24+ active users at https://hr.vicert.com.

## Architecture

```
src/backend/
├── VicertHRLite.Domain/        # Entities, enums (no dependencies)
├── VicertHRLite.Application/   # Services, DTOs, interfaces
├── VicertHRLite.Infrastructure/# Repositories, DbContext, external services
├── VicertHRLite.API/           # Controllers, authorization
└── VicertHRLite.Tests/         # xUnit tests

src/frontend/src/
├── components/    # React components
├── hooks/         # Custom hooks (useFormHandler, useDataLoader)
├── contexts/      # AuthContext for authentication state
└── utils/         # API utilities, helpers
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend API | .NET 9 Web API |
| ORM | Entity Framework Core 9 |
| Database | PostgreSQL |
| Frontend | React 19, TypeScript 5.8, Vite 7 |
| Styling | Tailwind CSS |
| Auth | Google OAuth + JWT (httpOnly cookies) |
| Cloud | AWS (ECS Fargate, RDS, S3, SES, CloudFront) |
| Testing | xUnit + Moq (backend), Vitest (frontend) |

## Key Files to Read

Before making changes, read these files:

1. **`CLAUDE.md`** - AI assistant guidelines
2. **`CODING_RULES.md`** - Comprehensive coding standards
3. **`.cursorrules`** - Development patterns

## Critical Rules

### Backend Rules
- Controllers must be < 200 lines (HTTP concerns only)
- All business logic goes in services
- Use repository pattern (no direct DbContext in services)
- Async methods end with `Async`
- Private fields use `_` prefix

### Error Handling Pattern
```csharp
// Services throw exceptions:
throw new ArgumentException("message");           // → 400 Bad Request
throw new InvalidOperationException("message");   // → 409 Conflict
throw new UnauthorizedAccessException("message"); // → 401/403

// Controllers catch and map to HTTP responses
```

### Frontend Rules
- Use `useFormHandler` for all forms
- Use `useDataLoader` for data fetching
- Tailwind CSS only (no inline styles)
- Components < 300 lines

### Testing Conventions
- Test files: `[ClassName]Tests.cs`
- Test methods: `[Method]_[Scenario]_[ExpectedResult]`
- Use shared helpers from `VicertHRLite.Tests/Helpers/`

## Common Commands

```bash
# Run backend tests
cd src/backend && dotnet test

# Run frontend tests
cd src/frontend && npm test

# Run coverage report
./scripts/run-coverage.sh

# Database migration
cd src/backend/VicertHRLite.Infrastructure
dotnet ef migrations add MigrationName -s ../VicertHRLite.API
```

## Output

After running this command, provide:
1. A brief summary of the project
2. The directory structure
3. Key patterns the developer should follow
4. Suggest which files to read first based on what they want to do
