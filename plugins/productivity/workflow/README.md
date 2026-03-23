# Workflow Plugin for Claude Code

A structured development workflow plugin that enforces proper planning before implementation.

## Overview

This plugin provides commands that guide developers through a disciplined feature development process:

```
PRD → Plan → Architecture → Implementation
```

Each phase must be completed before the next can begin, ensuring features are properly documented and planned.

## Installation

### Local Development

```bash
claude --plugin-dir ./plugins/workflow
```

### From Marketplace (coming soon)

```
/plugin install workflow@your-marketplace
```

## Commands

| Command | Purpose |
|---------|---------|
| `/workflow:new-feature [name]` | Start a new feature with PRD |
| `/workflow:plan [slug]` | Create implementation plan |
| `/workflow:architecture [slug]` | Document technical decisions |
| `/workflow:implement [slug]` | Start coding (after planning) |
| `/workflow:feature-status [slug]` | Check feature progress |

## Workflow

### 1. Start a New Feature

```
/workflow:new-feature user-authentication
```

Creates:
- `docs/features/user-authentication/PRD.md`

Claude will help you fill in requirements, user stories, and acceptance criteria.

### 2. Create Implementation Plan

```
/workflow:plan user-authentication
```

**Prerequisite:** PRD must exist and be approved.

Creates:
- `docs/features/user-authentication/plan.md`

Includes files to modify, implementation steps, testing strategy, and risks.

### 3. Document Architecture (Optional)

```
/workflow:architecture user-authentication
```

Use when the feature involves significant technical decisions:
- New technology choices
- Database schema changes
- API contract changes
- Security-sensitive functionality

Creates:
- `docs/features/user-authentication/architecture.md`

### 4. Implement

```
/workflow:implement user-authentication
```

**Prerequisites:**
- PRD must exist and be approved
- Plan must exist and be ready

Claude will:
- Verify all prerequisites
- Follow the implementation plan
- Update plan.md with progress
- Write tests as specified

### 5. Check Status

```
/workflow:feature-status user-authentication
```

Shows current phase and progress for any feature.

## Directory Structure

The plugin creates documentation in your project:

```
docs/
└── features/
    └── [feature-slug]/
        ├── PRD.md              # Product Requirements
        ├── plan.md             # Implementation Plan
        └── architecture.md     # Architecture Decision Record
```

## Why Use This?

**Without workflow:**
```
"Hey Claude, add user auth" → Immediate coding → Missing docs → Knowledge lost
```

**With workflow:**
```
/workflow:new-feature → Clear requirements
/workflow:plan → Thought-through approach
/workflow:implement → Structured execution with documentation
```

## Configuration

The plugin works out of the box. For customization, see the [workflow enforcement guide](../../guides/workflow-enforcement.md).

## License

MIT
