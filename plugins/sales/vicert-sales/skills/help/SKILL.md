---
name: help
description: Show available sales skills, explain what each one does, or give detailed help for a specific skill. Triggered by questions like "what skills do I have", "help", "how do I use this", "show commands", "what can I do", "what sales tools are available", or "help [skill-name]".
argument-hint: "[skill-name]"
allowed-tools: Read, Grep, Glob
---

# Vicert Sales Toolkit — Help

The user asked: `$ARGUMENTS`

You are the help system for the Vicert Sales Toolkit plugin. Your job is to help users discover and understand the available skills.

## Determine the Mode

1. **If `$ARGUMENTS` is empty, blank, or a general question** (e.g., "what can I do", "help", "show commands", "what skills do I have") → show the **Quick Reference Card** below.
2. **If `$ARGUMENTS` names a specific skill** (e.g., "compete", "build-roi", "prep call", "outreach", "proposal", "prospect", "manage prospect") → show **Detailed Skill Help** by reading the User Guide.

**Fuzzy matching rules** — accept common variations:
- "prep call" or "prep-call" or "call prep" → `prep-call`
- "outreach" or "write outreach" or "write-outreach" → `write-outreach`
- "proposal" or "write proposal" or "write-proposal" → `write-proposal`
- "roi" or "build roi" or "build-roi" → `build-roi`
- "compete" or "competitive" or "competition" → `compete`
- "prospect" or "manage prospect" or "manage-prospect" → `manage-prospect`
- "recap" or "opportunity recap" or "recap-opportunity" or "deal summary" or "deal recap" or "opportunity summary" or "deal status" or "where are we with" → `recap-opportunity`
If the argument doesn't match any skill, show an error with the list of valid skill names.

---

## Mode 1: Quick Reference Card

Display the following content exactly (adapt formatting as needed for readability):

---

**Vicert Sales Toolkit — Quick Reference**

You have 7 sales skills covering the full sales cycle:

| Skill | What It Does | When to Use It | Example |
|-------|-------------|----------------|---------|
| `write-outreach` | Writes cold emails, LinkedIn messages, follow-ups, re-engagement, and 3-touch sequences | First contact with a new prospect or re-engaging a cold lead | "Write a cold email to a VP Ops at an HSO, 200 employees" |
| `prep-call` | Generates a discovery call prep kit with strategy, questions, objections, and proof points | Before any prospect call — discovery, follow-up, or technical deep-dive | "Prep me for a call with Acme Healthcare Services, VP Ops and CIO attending" |
| `compete` | Creates a competitive positioning brief with differentiators and honest vulnerabilities | When a prospect is evaluating alternatives (consultancy, offshore, SaaS, in-house, status quo) | "How do we position against Cognizant for this deal?" |
| `write-proposal` | Generates one-pagers, executive proposals, pitch emails, capability summaries, follow-ups | When you need a polished document tailored to a specific prospect and audience | "Write a one-pager for Acme Healthcare Services, CFO audience" |
| `build-roi` | Produces a prospect-specific ROI analysis with cost breakdowns and payback timeline | When your champion needs to build the internal business case with their CFO | "Build an ROI for an HSO spending $420K/yr on 5 SaaS platforms" |
| `manage-prospect` | Creates, updates, and reviews prospect folders and profile.md files | When starting a new deal, after a call, or before a meeting to check for gaps | "Set up a prospect folder for Acme Healthcare Services, mid-size, VP Ops is champion" |
| `recap-opportunity` | Generates a consolidated internal recap of where a deal stands | Pipeline reviews, rep handoffs, manager check-ins, refreshing your memory before re-engaging | "Recap Acme Healthcare Services" |
**How to invoke skills:**
- **Natural language (recommended):** Just describe what you need — "Write me a cold email to a VP Ops at an HSO" — and the right skill runs automatically.
- **Slash commands:** For explicit control, use `/vicert-sales:skill-name` followed by your input — e.g., `/vicert-sales:write-outreach cold email to a VP Ops at an HSO`.

**Workspace setup:** See the User Guide for setup instructions.

**Get detailed help for any skill:** `/vicert-sales:help compete` or "help me with the ROI skill"

---

## Mode 2: Detailed Skill Help

1. Read the User Guide at `${CLAUDE_PLUGIN_ROOT}/USERS-GUIDE.md`.
2. Find the section for the requested skill (the skills are documented under "## The Skills in Detail" with headings like `### 1. \`write-outreach\` — Prospecting Messages`).
3. Present the following from that section:
   - **What it is** — one-sentence description
   - **What it produces** — the output types table
   - **What to provide** — key inputs from the "Input Anatomy" subsection
   - **3–5 examples** — selected from the "Examples" and "With a Prospect Profile" subsections. Include a mix of inline-detail examples and profile-enabled examples.
   - **Pro tips** — from the "Pro Tips" subsection
4. End with: "For the full reference, see the [User Guide](USERS-GUIDE.md)."

Format the output to be scannable — use tables, bold text, and short bullets. Keep it concise but complete.

---

## Mode 3: Unrecognized Skill Name

If the argument doesn't match any of the 7 skills above, display:

> **"[argument]" isn't a recognized skill.**
>
> Available skills: `write-outreach`, `prep-call`, `compete`, `write-proposal`, `build-roi`, `manage-prospect`, `recap-opportunity`
>
> Try `/vicert-sales:help [skill-name]` with one of the above, or just `/vicert-sales:help` to see what each skill does.
