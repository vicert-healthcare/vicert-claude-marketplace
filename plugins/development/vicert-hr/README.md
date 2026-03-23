# VicertHR Lite Plugin for Claude Code

Development commands for the VicertHR Lite Platform - a production HR management system built with .NET 9 and React 19.

## Overview

This plugin provides project-specific commands that understand VicertHR's architecture, patterns, and conventions. It helps developers:

- Scaffold new features following established patterns
- Run tests and check coverage
- Understand the codebase quickly
- Fix bugs using the project's workflow

## Installation

### Local Development

```bash
claude --plugin-dir ./plugins/vicert-hr
```

### From Marketplace (when configured)

```
/plugin install vicert-hr@your-marketplace
```

## Commands

| Command | Purpose |
|---------|---------|
| `/vicert-hr:onboard` | Get oriented with the project structure and patterns |
| `/vicert-hr:add-endpoint` | Add a complete API endpoint (DTO, Service, Controller, Tests) |
| `/vicert-hr:add-component` | Create a React component with proper hooks |
| `/vicert-hr:fix-bug` | Guided workflow for investigating and fixing bugs |
| `/vicert-hr:run-tests` | Run backend and/or frontend tests |
| `/vicert-hr:coverage` | Check test coverage and identify gaps |

## Architecture

VicertHR follows Clean Architecture:

```
src/backend/
├── VicertHRLite.Domain/        # Entities, enums (no dependencies)
├── VicertHRLite.Application/   # Services, DTOs, interfaces
├── VicertHRLite.Infrastructure/# Repositories, DbContext, external services
├── VicertHRLite.API/           # Controllers, authorization
└── VicertHRLite.Tests/         # xUnit tests

src/frontend/src/
├── components/    # React components
├── hooks/         # useFormHandler, useDataLoader, etc.
├── contexts/      # AuthContext
└── utils/         # API utilities
```

## Key Patterns

### Backend

- **Controllers < 200 lines** - HTTP concerns only
- **Business logic in services** - Never in controllers
- **Repository pattern** - No direct DbContext in services
- **Async methods end with `Async`** - e.g., `GetEmployeeAsync()`
- **Private fields use `_` prefix** - e.g., `_employeeService`

### Error Handling

```csharp
// Services throw exceptions:
throw new ArgumentException("message");           // → 400
throw new InvalidOperationException("message");   // → 409
throw new UnauthorizedAccessException("message"); // → 401/403

// Controllers catch and map to HTTP responses
```

### Frontend

- **`useFormHandler`** for all forms
- **`useDataLoader`** for data fetching
- **Tailwind CSS only** - No inline styles
- **Components < 300 lines** - Extract to hooks if larger

### Testing

- Test files: `[ClassName]Tests.cs`
- Test methods: `[Method]_[Scenario]_[ExpectedResult]`
- Use shared helpers from `VicertHRLite.Tests/Helpers/`

## Tech Stack

- **Backend**: .NET 9 Web API, EF Core 9, PostgreSQL
- **Frontend**: React 19, TypeScript 5.8, Vite 7, Tailwind CSS
- **Auth**: Google OAuth + JWT (httpOnly cookies)
- **Cloud**: AWS (ECS Fargate, RDS, S3, SES, CloudFront)
- **Testing**: xUnit + Moq (backend), Vitest (frontend)

## Prerequisites

This plugin assumes you're working in the VicertHR Lite Platform repository with:

- .NET 9 SDK
- Node.js 20+
- PostgreSQL (or Docker)

## License

MIT
