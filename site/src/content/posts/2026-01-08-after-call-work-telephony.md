---
title: After Call Work Telephony
author: Bojan Miric
date: "2026-01-08"
tags: [carenet, telephony, genesys, acw, cloud-telephony]
type: show-and-tell
---

Bojan Mirić demonstrated the After Call Work (ACW) feature in CareNet's cloud-based telephony system — a critical workflow component for call center operations.

## What is ACW?

After Call Work is the period following a completed call where agents handle post-call tasks:
- **Data entry** — Recording call outcomes and notes
- **Documentation** — Updating patient records or case files
- **Follow-up actions** — Scheduling callbacks, sending information, escalating issues
- **Wrap-up** — Any administrative tasks before the agent is ready for the next call

Without ACW, agents would immediately become "available" after a call ends, potentially receiving new calls before they've finished documenting the previous one.

## Status Flow

```
Available → Interacting (during call) → ACW → Available
```

- **Available** — Agent can receive new calls
- **Interacting** — Agent is on an active call
- **ACW** — Post-call work period (configurable duration)
- **Off Queue** — Agent is unavailable (break, offline)

## Demo Walkthrough

1. Agent (Bojan Miric) starts in "Available" status
2. A client call comes in via the work queue
3. **Genesis platform** routes the call to the next available agent
4. Call is completed — agent automatically enters **ACW status**
5. ACW timer runs (10 seconds in demo; typically 3-10 minutes in production)
6. Agent can **manually end ACW early** if tasks are completed
7. After ACW expires (or is manually ended), agent returns to "Available"

## Configuration

ACW duration is fully configurable per queue/team — some teams need 3 minutes, others need 10+ minutes depending on the complexity of their post-call documentation requirements.

## CareNet Context

The telephony domain is **extremely complex**:
- CareNet used their two most complex clients as the "gold standard" for implementation
- This resulted in highly customized, complicated workflows
- The UI is dense and requires significant manual interaction
- The UI/UX designer works in isolation, sometimes leading to designs that don't align with the existing architecture

## Related Feature: "Currently Idle" Stopwatch

A client-side feature in Vida Home that shows agents how long they've been idle (not on calls or doing ACW). The intention: encourage agents to reduce downtime by making idle time visible.
