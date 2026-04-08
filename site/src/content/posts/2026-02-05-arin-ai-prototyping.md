---
title: Arin AI Prototyping
author: Maja Bogdanovic
date: "2026-02-05"
tags: [arin, prototyping, next-js, claude-code, prd]
type: show-and-tell
---

Maja Bogdanović, Veljko Rajković, and Mihailo Trisovic demonstrated how AI-powered prototyping dramatically accelerated the Arin project kickoff.

## Project Context

Arin is an internal tool for managing users, clients, and organizations. The project's core challenge: building a user-friendly UI for an enormous JSON configuration file — up to 30,000 lines of code — that clients currently edit manually. Vicert handles the frontend while the client's team manages the backend.

## The Prototype

Using Claude Code with an initial PRD, the team built a working **Next.js prototype in approximately two days**. Veljko Rajković shared the skills used in the team chat.

### Features Implemented

- **Real-time JSON manipulation** — Browse and edit massive configuration files with live preview
- **Validation** — Check modified data against the client's server (currently mocked)
- **Multi-environment deployment** — Deploy to test, IoT, and production environments
- **Diff views** — Compare changes between versions
- **Rollback** — Revert to previous configurations
- **Change history** — Tab showing all modifications with timestamps

### Technical Approach

- Built with **Next.js** following Vercel best practices for both frontend and backend
- Claude Code generated a technical specification (MDF) from the PRD, including:
  - Validators and input patterns
  - 4 logical implementation phases with defined goals
  - Request/response handling per phase
  - Acceptance criteria including E2E tests

## Impact

- **Prototyping identified a missing "draft" status** in the workflow — a critical insight that improved grooming sessions with the client
- The client was impressed by the speed of delivery
- The prototype became a communication tool: clients could see and interact with the product early, preventing costly misunderstandings
- Neb Lazic suggested integrating AI-built prototyping into Vicert's standard toolkit and sharing useful skills in the marketplace
