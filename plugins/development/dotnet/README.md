# .NET Plugin for Claude Code

Scaffolding commands for C#/.NET development following Clean Architecture patterns.

## Overview

This plugin provides commands for quickly scaffolding .NET components:

- MediatR commands and queries (CQRS)
- Domain entities with EF Core configuration
- Minimal API endpoints
- Unit and integration tests
- Complete vertical slice features

## Installation

### Local Development

```bash
claude --plugin-dir ./plugins/dotnet
```

### From Marketplace (coming soon)

```
/plugin install dotnet@your-marketplace
```

## Commands

| Command | Purpose |
|---------|---------|
| `/dotnet:command [name]` | Scaffold MediatR command with handler and validator |
| `/dotnet:query [name]` | Scaffold MediatR query with handler and DTO |
| `/dotnet:entity [name]` | Create domain entity with EF Core configuration |
| `/dotnet:endpoint [name]` | Create minimal API endpoint |
| `/dotnet:service [name]` | Create service with interface |
| `/dotnet:handler [name]` | Create MediatR handler (standalone) |
| `/dotnet:test [name]` | Generate unit tests |
| `/dotnet:integration-test [name]` | Generate integration tests |
| `/dotnet:feature [name]` | Scaffold complete vertical slice feature |

## Architecture

Commands follow Clean Architecture conventions:

```
src/
├── [Project].Domain/           # Entities, value objects
├── [Project].Application/      # Commands, queries, handlers
├── [Project].Infrastructure/   # EF Core, external services
└── [Project].Api/              # Endpoints, middleware

tests/
├── [Project].Application.Tests/
└── [Project].Api.Tests/
```

## Patterns Used

### CQRS with MediatR

- **Commands**: Modify state, return `Result<T>` or `Result`
- **Queries**: Read data, return DTOs
- **Handlers**: Single responsibility, injected dependencies

### Validation

- FluentValidation in pipeline behavior
- Validators auto-registered via assembly scanning

### Error Handling

- `Result<T>` pattern for expected failures
- Exceptions for unexpected errors
- Global exception handler in API

### Testing

- **Unit tests**: xUnit + Moq + FluentAssertions
- **Integration tests**: WebApplicationFactory + Testcontainers

## Example Usage

### Create a Command

```
/dotnet:command CreateOrder
```

Creates:
- `CreateOrderCommand.cs`
- `CreateOrderCommandHandler.cs`
- `CreateOrderCommandValidator.cs`

### Create a Complete Feature

```
/dotnet:feature Products
```

Creates entire vertical slice:
- Domain entity
- Commands (Create, Update, Delete)
- Queries (GetById, GetAll)
- DTOs
- EF Core configuration
- API endpoints
- Unit tests
- Integration tests

## Prerequisites

Your project should have:

- .NET 8 SDK
- MediatR (+ MediatR.Extensions.Microsoft.DependencyInjection)
- FluentValidation (+ FluentValidation.DependencyInjectionExtensions)
- Entity Framework Core
- xUnit, Moq, FluentAssertions (for tests)

## Configuration

Commands use placeholders like `[PROJECT_NAME]` and `[Entity]`. Claude will replace these based on:

1. Your project structure
2. The CLAUDE.md configuration
3. Context from existing code

## License

MIT
