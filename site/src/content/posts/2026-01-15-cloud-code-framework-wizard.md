---
title: Cloud Code Framework Wizard
author: Bojan Todorovic
date: "2026-01-15"
tags: [claude-code, framework, plugins, wizard, best-practices]
type: show-and-tell
---

Bojan Todorović presented early work on a framework for bootstrapping new Claude Code projects with proper structure, tooling, and best practices built in from day one.

## The Vision

A wizard/framework that ensures every new project starts with:
- Appropriate **skills** for the technology stack
- Pre-configured **agents** for common workflows
- **Rules and conventions** enforced from the start
- A development process that requires complete documentation (PRD, plan, ADR) before any implementation begins

## Current State

Early-stage brainstorming and development with initial templates for:
- **Python** projects
- **JavaScript/TypeScript** projects
- **.NET 8** projects

Each template includes starter files for PRD, implementation plan, and ADR documentation.

### Inspiration

Mihailo Trisovic shared Vercel's React Best Practices as inspiration for the kind of comprehensive, opinionated templates the framework should provide.

## The Pivot: From Wizard UI to Plugins

Neb Lazic made a crucial suggestion: instead of building a UI wizard for technology selection, **convert everything to Claude Code plugins**:

### Plugin Categories

1. **Technology-specific plugins** — React plugin, .NET plugin, Python plugin — each containing best practices, coding conventions, and common patterns
2. **Project-specific plugins** — ARIN plugin, Canvas plugin — containing domain knowledge, API patterns, and project conventions
3. **Essential MCP servers** — Sequential Thinking, GitHub, Context7 — pre-configured in plugin definitions
4. **Sub-agents** — ADR sub-agent, review sub-agent — embedded in the framework for automated workflows

### The Marketplace Vision

Develop an **ISAP marketplace** organizing plugins by:
- **Project** — All plugins for a specific client engagement
- **Department** — Engineering, QA, design
- **Use case** — Prototyping, migration, testing, documentation

## Discussion

- Neb asked about the origin of the workflows — Bojan explained they were created with Claude's help, building on the "spec kit" methodology discussed in previous sessions
- The team agreed that plugins are the right distribution mechanism, avoiding the overhead of a separate wizard application
