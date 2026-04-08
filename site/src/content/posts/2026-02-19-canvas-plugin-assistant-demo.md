---
title: Canvas Plugin Assistant Demo
author: Milos Djakovic
date: "2026-02-19"
tags: [canvas, plugin-assistant, claude-code, sdk]
type: show-and-tell
---

Miloš Djaković presented the Canvas Plugin Assistant (CPA), a Claude Code plugin provided by Canvas to streamline plugin development.

## What is CPA?

The Canvas Plugin Assistant is Canvas's official Claude Code plugin that bundles knowledge about their SDK, database performance metrics, wrap-up commands, and platform conventions. Its goal: enable plugin creation with minimal technical overhead.

## Demo: Custom Reminders Plugin

The demo walked through building a Custom Reminders plugin that allows clients to edit email and SMS message content. Key observations:

- CPA maintains **session context** across interactions, storing user prompts (but not its own responses)
- It generates **workflow artifacts**: DB Performance Review, Coverage Report, and User Inputs
- Uses `dir env` for automatic environment loading with a defined `workspace dir` and `plugin forge dir` structure
- Context is stored in JSON format within Canvas's internal structure

## Two Development Approaches

1. **Trust-based (Milos's approach)** — Give instructions as a product persona, focusing on the desired end result rather than technical implementation details
2. **Technical (Admir's approach)** — To be presented the following Thursday, focusing on precise technical specifications

## Discussion Points

- **Bojan Todorovic** noted that access to CPA's internal context structure is limited since it's proprietary to Canvas
- The team expressed interest in understanding how Canvas stores and manages plugin development context
- The session highlighted the value of having a dedicated plugin assistant that understands the target platform's conventions and constraints
