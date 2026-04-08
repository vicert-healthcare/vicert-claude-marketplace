---
title: ARIM PRD Processing Agents
author: Maja Bogdanovic
date: "2026-01-29"
tags: [arin, agents, prd, automation, requirements]
type: show-and-tell
---

Maja Bogdanović presented an ambitious multi-agent system for processing Product Requirements Documents on the ARIM project.

## Project Context

The ARIM project involves building a user-friendly UI for a massive JSON configuration file (up to 30,000 lines) that clients currently edit manually. Before any code could be written, the team needed to break down the complex PRD into manageable pieces.

## The Agent Pipeline

Three specialized agents work in sequence:

1. **PRD Splitter Agent** — Reads the initial PRD and divides it into discrete epics, each representing a major feature area
2. **Feature Generator Agent** — Takes each epic and creates detailed feature specifications with acceptance criteria
3. **Decision Recorder Agent** — Captures technical decisions made during the process, similar to Architectural Decision Records (ADRs)

### Current State vs. Vision

Currently, Maja runs the agents individually. The long-term vision is a **master orchestrator agent** that:
- Processes the entire PRD end-to-end
- Generates product descriptions, epics, and features automatically
- Creates a **global template** for converting business requirements into detailed user stories

Maja attempted an orchestrator agent but found individual agents more reliable at this stage.

## Practical Value

- **Grooming sessions** with the client are significantly smoother because the team arrives with structured, detailed breakdowns
- **Technical questions** are identified early through the decision recorder, reducing surprises during implementation
- The approach builds on work from the previous project, where Claude extracted decisions from meeting transcripts

## Discussion

- Mihailo Trisovic clarified how the agents were created and their interaction with the PRD
- The team discussed the potential for this approach to become a standard Vicert workflow for any new project kickoff
