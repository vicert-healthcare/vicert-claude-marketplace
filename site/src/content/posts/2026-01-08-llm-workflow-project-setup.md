---
title: LLM Workflow Project Setup
author: Milos Djakovic
date: "2026-01-08"
tags: [llm, workflow, agents, documentation, knowledge-management]
type: show-and-tell
---

Miloš Djaković presented a meticulously structured personal workflow for LLM-assisted development that works across Cursor, Codex, and Claude.

## Architecture

The system uses `Agents.md` as a **router** — a central dispatch file that directs Claude to the right resources based on the current task.

### Directory Structure

```
project/
├── agents/          # Workflow scripts and automation
├── artifacts/       # Jira issues, solutions, learnings
├── knowledge/       # Persistent project knowledge
├── journal/         # Work logs and time entries
└── sources/         # Raw inputs (Jira stories, transcripts)
```

## Workflows

The `agents` directory contains workflow definitions covering the full development lifecycle:

- **Analysis** — Breaking down requirements and understanding scope
- **Coding conventions** — Enforcing project-specific code standards
- **Research** — Investigating technical approaches and alternatives
- **Git commit messages** — Following conventional commit standards
- **Jira issues** — Handling spikes, stories, and tasks with appropriate templates
- **Time logging** — LLM-assisted timesheet entries based on work logs
- **PR comments** — Addressing review feedback systematically
- **Daily Slack statuses** — Auto-generating status updates (challenging due to Slack's `mrkd` format differing from standard Markdown)

Scripts in the agents directory extract specific sections from workflow files (via front matter parsing) to avoid loading entire large files into context.

## Knowledge Management

The `knowledge` directory stores validated, persistent information:
- **Bruno and FHIR setup** configurations
- **Data integration overview** for Canvas
- **Plugin review** documentation
- **Inferno platform** details for US Core and ONC certification testing

Critical rule: LLM must **stress-test knowledge against actual code** rather than treating stored knowledge as the sole source of truth.

## Journal System

Work journals maintain a chronological record:
- **Jira issue tracking** — Issue ID, story summary, description, acceptance criteria
- **Time entries** — LLM searches by date, analyzes stories, and proposes time allocations

## Change Management

A sophisticated approach to keeping documentation current:
- **"Supersedes" references** — Newer entries reference what they replace
- **Directional rule** — Older files never reference newer ones; always traverse from newest to oldest
- **`schema.md`** — References journal and knowledge structure definitions, serving as the source of truth for directory organization

## Impact Assessment

Miloš reported that the workflow:
- Occasionally slows things down (10-30 minutes for troubleshooting when something breaks)
- Overall makes him **faster, more confident, and more reliable** in his work
- Provides a structured foundation that prevents "starting from zero" in each new Claude session
