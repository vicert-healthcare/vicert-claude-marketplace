---
title: Git Log Timesheet Automation
author: Igor Stojanovic
date: "2026-02-19"
tags: [git, timesheet, automation, cli, skill]
type: show-and-tell
---

Igor Stojanović presented a practical solution for one of development's most tedious tasks: filling out timesheets.

## The Problem

Developers at Vicert work across multiple projects and repositories (Wizard, Wizard Schema, Member IIS, Android IIS). Manually recalling what was done each day and logging it in Clockwork is time-consuming and inaccurate.

## The Solution

A two-part system: a shell script for data collection and a Claude Code skill for intelligent summarization.

### Part 1: `gitlog.sh` Script

- Recursively searches Git repositories under a configured root directory
- Extracts commit logs filtered by author and date range
- Outputs CSV files with columns: GRID, date, commit log, project
- Handles edge cases: finds commits on non-default branches, excludes stash logs and merge branch entries

### Part 2: `gitlog` Skill

The Claude Code skill (`skill.md`) defines a `/gitlogs` command with `since` and `until` arguments:

- Defaults to showing logs for the current day if no dates specified
- Claude intelligently interprets requests like "write me GitLogs for the previous month" — correctly excluding weekends
- Generates summary reports grouped by date and project
- Skill is configured at **user level** (not project level) for flexibility across all projects

### Configuration

Users only need to set:
- Their Git username
- Root directory containing all project repositories

## Demo Highlights

- Demonstrated iterative development: started with basic CSV export, added project columns, found missing commits on non-default branches, cleaned up stash/merge entries
- Claude created the skill automatically from the workflow description

## Next Steps

- Extend functionality to **auto-fill timesheets** via the Clockwork API
- Default 30 minutes per task (more practical than trying to estimate precise time, given breaks and context switching)
- Igor will share the skill after updating the summary log descriptions
