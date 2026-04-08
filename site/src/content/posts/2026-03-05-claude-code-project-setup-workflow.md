---
title: Claude Code Project Setup Workflow
author: Mihailo Trisovic
date: "2026-03-05"
tags: [claude-code, workflow, memory, interview-mode, documentation]
type: show-and-tell
---

Mihailo Trisovic demonstrated a comprehensive workflow for setting up and working with Claude Code on client projects, developed over two months on the RIN/Arin project.

## Project Context

The Arin project involves integrating Vicert's frontend work into the client's existing mono-repo. Initial development included rapid prototyping with unclear requirements that were iteratively refined with the client. Vicert's work lives within `UAPS/console/features` in the client's repository.

## Memory Folder Structure

A structured `memory` folder provides persistent context for Claude:

- **`api.md`** — API descriptions and endpoint documentation
- **`architecture.md`** — System architecture, monorepo structure, frontend blueprints
- **`data_model.md`** — Data models (requiring ongoing updates, e.g., for feature flags)
- **`decisions.md`** — Architectural decision records that Claude can extract from meeting transcripts
- **`implementation_notes.md`** — Implementation-specific notes and patterns

Claude generated the initial versions of these files using meeting transcripts and feature information provided at project start.

## Feature-Based Workflow

Each feature has its own markdown file in a `features` folder containing description, business context, and user story. The workflow:

1. **Interview Mode** — Claude asks detailed questions (business, technical, architectural) before writing any code. This produced a 2.5-hour session for Maja Bogdanovic that resulted in logical, comprehensive questions about implementation and business logic
2. **Plan Mode** — Creates an implementation plan based on gathered context
3. **Implementation** — Executes the plan with sub-agent driven execution
4. **Documentation** — A `document` command updates feature files, architecture docs, and decisions if anything changed during implementation

The goal: maintain documentation clean enough that features could be re-implemented from scratch and produce the same result.

## Figma Integration

The client's Figma designs had poorly structured layers, making it difficult for Claude to read via MCP. Solution: export Figma screens as images into a `docs` folder with each screen in its own subfolder. Claude works excellently with screenshots.

## Tips & Best Practices Shared

- **Parallel work** — Use `git worktree` (e.g., main branch on port 8000, worktree on 8100)
- **Create skills** for repetitive tasks
- **Bug fixing** — Providing just the error message is often sufficient; but beware of Claude fixing symptoms instead of causes (e.g., removing authentication for 401 errors)
- **Auto Memory** — New `auto memory enable` feature where Claude learns from mistakes. The memory file can be committed to Git and shared across the team
- **Explicit rules** — Add directives like "when fixing tests, never change the test, only the source code" to `claude.md`
