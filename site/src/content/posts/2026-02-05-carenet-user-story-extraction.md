---
title: CareNet User Story Extraction
author: Nikola Markovic
date: "2026-02-05"
tags: [carenet, testing, user-stories, claude-sdk, automation]
type: show-and-tell
---

Nikola Marković presented how the CareNet team used AI to handle an urgent architecture change that landed just before their GoLive deadline.

## The Challenge

Two of CareNet's largest clients required a last-minute architecture change: grouping multiple calls into a single conversation to leverage Genesis's reporting capabilities. This change impacted every part of the system, requiring rapid test case generation for smoke testing.

## AI-Powered Test Generation

The team used a custom tool to extract user stories and automatically generate test cases. However, an unexpected issue emerged: **output differed between running the skill through the application versus directly from Claude Code**, even when using the same model (Sonnet vs. Opus were tested to rule out model differences).

Claude spent approximately 20 minutes self-diagnosing the inconsistency problem — an interesting demonstration of AI troubleshooting its own behavior.

## Root Cause & Recommendations

- **Nikola Markovic** explained that the backend service was invoking the Claude CLI for processing, which introduced variability
- **Neb Lazic** recommended switching to the **Claude Agent SDK** instead of calling CLI from the application, providing more stable and controllable results
- Neb also suggested creating a dedicated CLI tool or MCP server via Claude for direct system interaction (e.g., with Microsoft Teams)
- The current implementation was acknowledged as a quick first version, with plans for improvement

## Broader Discussion

- **Neb Lazic** mentioned that Harvesting uses a Claude plugin specifically for generating Canvas plugins, bundling complete Canvas documentation and examples in skills
- The team agreed that developing project-specific skills (e.g., a Genesis skill for CareNet) would significantly improve consistency and output quality
