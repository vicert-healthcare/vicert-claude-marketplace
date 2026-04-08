---
title: JIRA Sync CLI Tool
author: Igor Stojanovic
date: "2026-01-22"
tags: [jira, sync, cli, automation, included-health]
type: show-and-tell
---

Igor Stojanović presented JIRA Sync, a CLI tool that solves the persistent challenge of keeping Vicert's internal JIRA in sync with client JIRA instances.

## The Problem

Working with Included Health's JIRA alongside Vicert's internal JIRA meant constantly switching between systems and manually copying tasks. This was slow, error-prone, and disrupted developer flow.

## How JIRA Sync Works

### Commands

| Command | Description |
|---------|-------------|
| `init` | Interactive setup: configures API tokens, usernames, project keys |
| `sync` | Delta synchronization of new/changed tasks |
| `scheduler` | Install/uninstall cron jobs for automatic sync (every 10 minutes) |
| `pull one task` | Manually pull a specific task by ID |

### Data Storage

- **Credentials** → `.env` file (gitignored)
- **Configuration** → `.js` file
- **Sync state** → `state.json` tracking synchronized tasks and metadata
- **Logs** → Retained for 365 days, older entries auto-deleted

### Key Design Decisions

- **One-way sync only** — Tasks flow from Included Health's JIRA → Vicert internal JIRA. Changes in the internal JIRA are never overwritten
- **Delta sync** — Only processes changes since last sync, keeping it fast and efficient
- **CLI-based** — Deliberately not a plugin, given its system-level nature

## Development Journey

Development took longer than expected due to other obligations and the need to cover all edge cases. However, using AI tools (Cursor and Claude) **significantly accelerated the finalization** of the application, particularly for boilerplate code and API integration patterns.

## Discussion

- The team discussed potential web application expansion, but client constraints (Chrome-only, no extensions) make this challenging
- **Neb Lazic** noted that the internal JIRA can be a **superset** of the client JIRA — containing additional details, internal notes, and context that wouldn't be shared externally
- Next steps: testing on the Included project, then potential rollout to other client projects
