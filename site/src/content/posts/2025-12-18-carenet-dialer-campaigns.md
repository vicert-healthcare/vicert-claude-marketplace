---
title: CareNet Dialer Campaigns
author: Milan Ilic
date: "2025-12-18"
tags: [carenet, telephony, genesys, campaigns, vida]
type: show-and-tell
---

Milan Ilic and the CareNet team presented their work on dialer campaigns — the backbone of automated client outreach in healthcare communication.

## Campaign Types

### Preview Campaigns
- Agent receives a **list of contacts** to call
- Agent **manually initiates** each call
- Used when personalization or preparation is needed before each call

### Predictive Campaigns
- The telecom system **automatically dials** numbers from the contact list
- Calls are **routed to available agents** as connections are made
- Used for high-volume outreach (surveys, appointment reminders, sales)

## Technical Integration

Campaigns are configured in **Genesys Cloud** and integrated with **Vida systems** through **Workload IDs**:
- A Workload ID is an engine within Vida that manipulates transactions
- Each campaign maps to a specific workload configuration
- The demo showed campaign activation and callback interaction handling

## Team Structure

The project was split across four areas:
1. **Solution Director Workflow** — Campaign orchestration logic
2. **Host side on Vida** — Backend integration (handled by a colleague in Romania)
3. **Phone and frontend** — Milan Ilic's team handling the agent interface
4. **Service and client** — API layer (handled by a colleague in the US)

## Current Focus

The team's recent work centered on **fixing edge cases and bugs** with the predictive dialer rather than building new features — a common phase in telephony projects where the complexity of real-world call scenarios reveals unexpected behaviors. The predictive dialer in particular has numerous edge cases around call timing, agent availability, and connection handoff.
