# Vicert Sales Toolkit — User Guide

## What Is This?

This is a plugin for [Claude Code](https://docs.anthropic.com/en/docs/claude-code), Anthropic's AI coding agent. Claude Code runs in your terminal (or as a desktop app) — you open a folder, have a conversation, and Claude works alongside you with full access to your files.

Plugins extend what Claude can do. This plugin teaches Claude everything it needs to know about Vicert's sales process — our services, pricing, proof points, competitive positioning, and how to write like a healthcare industry professional. Instead of starting from scratch every time you need a cold email or an ROI analysis, you activate a skill and describe the situation in plain English. Claude produces a polished first draft grounded in Vicert's actual data.

**You don't need to be technical to use this.** If you can describe a prospect to a colleague, you can use these skills. Type a slash command or just say what you need in natural language — Claude figures out the rest.

---

## What's Inside

This plugin gives you eight AI-powered skills that cover the full sales cycle — from prospect setup through first outreach to closing with an ROI analysis — plus deal recaps and in-session help. Each skill is grounded in Vicert's actual services, pricing, proof points, and competitive positioning. The output sounds like a seasoned healthcare sales professional, not a marketing template.

**Important:** Every output needs your review before it reaches a prospect. The skills produce strong first drafts — you add the personal touch, verify the details, and make it yours.

---

## Quick Reference

| Skill | What It Produces | How to Ask |
|-------|-----------------|------------|
| `write-outreach` | Cold emails, LinkedIn messages, follow-ups, re-engagement, 3-touch sequences | "Write me a cold email to a VP Ops at an HSO..." |
| `prep-call` | Discovery call prep kit with strategy, questions, objections, proof points | "Prep me for a discovery call with Acme..." |
| `compete` | Competitive positioning brief with differentiators and honest vulnerabilities | "How do we position against Cognizant for this deal?" |
| `write-proposal` | One-pagers, executive proposals, pitch emails, capability summaries, follow-ups | "Write a one-pager for Acme, CFO audience..." |
| `build-roi` | Detailed ROI analysis with cost breakdown, 3-year view, payback timeline | "Build an ROI analysis for Acme's claims platform..." |
| `manage-prospect` | New prospect folder + profile, profile updates, profile gap review | "Set up a prospect folder for Acme Healthcare Services..." |
| `recap-opportunity` | Consolidated internal deal recap with health assessment and next actions | "Recap Acme Healthcare Services" or "Where are we with MidState?" |
| `help` | Quick reference card for all skills, or detailed help for a specific skill | "What sales skills do I have?" or "Help me with the ROI skill" |


---

## Adding Your Own Context

The workspace works best when you give it context about your prospects. Three things make a big difference:

### 1. Prospect profiles 
A `profile.md` in each prospect's folder. Fill it out once (~5 minutes) and every skill reads it automatically. No more re-typing "HSO, 250 employees, VP Ops is the champion..." on every invocation.

The easiest way to create one is with the `manage-prospect` skill:

```
Set up a prospect folder for Acme Healthcare Services — mid-size, 250 employees, VP Ops is the champion
```

This creates the prospect folder, the `notes/` subfolder, and a `profile.md` pre-populated with the details you provided. You can also update profiles the same way ("Update Acme: CFO is Lisa Park, budget authority") and review them for gaps ("What's missing in Acme's profile?").


Then fill out what you know. Everything is optional — a minimal profile with just org name, type, and one pain point already makes a difference. A rich profile with contacts, systems, and competitive context makes the output dramatically better.

Here is the example of a rich profile:

```markdown
## Organization
- **Name:** Acme Healthcare Services
- **Type:** Healthcare services organization
- **Size:** 250 employees, processing 300K claims/year
- **Location:** Chicago, IL

## Key Contacts
| Name | Title | Notes |
|------|-------|-------|
| Sarah Chen | VP Operations | Champion — brought us in |
| Mike Torres | CIO | Technical evaluator, skeptical of custom vs. SaaS |
| Lisa Park | CFO | Budget authority, cares about payback period |

## Pain Points
- Manual reconciliation across 5 SaaS platforms — 2 FTEs spend 100% of time on it
- Key-person dependency on claims processing — one person knows how it all connects
- SaaS costs increasing ~8% annually with no end in sight

## Current Systems & Spend
| Tool / Process | Annual Cost | Pain |
|---------------|-------------|------|
| HealthEdge claims | $120K/yr | Doesn't handle dental adjudication |
| Jiva care mgmt | $85K/yr | Manual data entry from claims system |
| Custom spreadsheets | 2 FTEs ($160K) | The glue holding everything together |

## Competitive Context
- Got a $1.2M quote from Cognizant — CIO liked the brand, VP Ops thought it was overkill

## Deal Status
- **Stage:** Discovery scheduled
- **Timeline:** Q3 budget cycle — decision by June
- **Budget:** CFO aware, no formal approval yet
```

### 2. Meeting notes, call transcripts, and email threads
Drop any of these into a `notes/` folder inside the prospect's directory. Claude Code reads them automatically before generating output.


Then add files as you go: meeting notes you write after a call, transcripts exported from Zoom/Teams/Gong, email threads copied from your inbox. Use a simple naming convention — `YYYY-MM-DD-{description}.md` (or `.txt` for raw transcripts) — but no rigid format is required. Just drop the file in.

Call transcripts are especially valuable. They contain the prospect's exact words, specific objections, enthusiasm signals, numbers they mentioned, and commitments they made. Claude Code scans transcripts for key signals rather than reading them end-to-end, so even long transcripts (5K–20K+ words) work fine.

### 3. Communication style
A shared `my-profile.md` file at the workspace root that defines the tone and style for all skill outputs. This file is shared across the team — it's not per-rep. Modify it to adjust how all outputs sound.

### What the Folder Looks Like After a Few Weeks

```
~/Sales/                                     ← your workspace (launch Claude Code here)
├── CLAUDE.md
├── my-profile.md                            ← shared communication style preferences
└── prospects/
    ├── acme-healthcare-services/
    │   ├── profile.md                       ← prospect profile (you fill out)
    │   ├── notes/                           ← your notes, transcripts, emails
    │   │   ├── 2026-02-13-intro-call.md
    │   │   ├── 2026-02-15-discovery-transcript.txt
    │   │   └── 2026-02-16-email-thread-vp-ops.md
    │   ├── outreach-cold-email-2026-02-13.md   ← skill outputs (Claude Code generates)
    │   ├── prep-call-2026-02-15.md
    │   ├── compete-vs-cognizant-2026-02-18.md
    │   ├── proposal-executive-2026-02-22.md
    │   └── roi-analysis-2026-02-25.md
    └── bluecross-regional/
        ├── profile.md
        ├── outreach-linkedin-2026-02-14.md
        └── prep-call-2026-02-20.md
```

Each prospect gets their own folder. `profile.md` and `notes/` are your input — fill them out and Claude Code reads them automatically. Skill output files are generated by Claude Code. You can open any file in a text editor, attach it to emails, or drop it in Slack.

---

## The Skills in Detail

The skills below are presented in sales-cycle order — the sequence you'd typically use them as a deal progresses from first touch to close.

---

### 1. `manage-prospect` — Prospect Management

This skill creates, updates, and reviews prospect profiles — the structured files that store everything you know about a prospect. It's the foundation that makes every other skill work better. When you set up a prospect folder and keep the profile current, skills like `write-outreach`, `prep-call`, and `build-roi` automatically pull in org details, contacts, pain points, and deal context instead of requiring you to repeat them every time.

#### Three Operations

| Operation | What It Does | What It Produces |
|-----------|-------------|-----------------|
| **Create** | Sets up a new prospect folder with `profile.md` and `notes/` directory | Pre-populated profile with whatever details you provide; empty sections left as templates |
| **Update** | Merges new information into the correct profile sections | Updated `profile.md` with a summary of what changed |
| **Review** | Scans the profile, notes, and prior skill outputs for gaps | Gap analysis with specific suggestions for what to ask or research next |

#### The Profile Structure

Every profile has 7 sections, always in this order:

| # | Section | Key Fields |
|---|---------|-----------|
| 1 | **Organization** | Name, Type (HSO / payer / provider group / specialty plan / health-tech), Size, Location |
| 2 | **Key Contacts** | Table: Name, Title, Notes (role in deal — champion, decision-maker, blocker, influencer) |
| 3 | **Pain Points** | Bullet list with numbers where available (e.g., "3 FTEs spend 60% of time on reconciliation") |
| 4 | **Current Systems & Spend** | Table: Tool/Process, Annual Cost, Pain |
| 5 | **Competitive Context** | Bullet list of alternatives being evaluated |
| 6 | **How We Connected** | Source, timing, referral details |
| 7 | **Deal Status** | Stage, Timeline, Budget, Decision process |

#### Input Anatomy

What to provide depends on the operation:

- **New prospect** — At minimum: prospect name + organization type. The more you include upfront (size, contacts, pain points, how you connected), the richer the starting profile.
- **Update** — Prospect name + the new information. The skill figures out which section(s) it belongs in and merges it without overwriting existing data.
- **Review** — Just the prospect name. The skill reads the profile, scans notes, and reports what's well-populated, what's sparse, and what information exists in notes or skill outputs but hasn't been added to the profile yet.

#### Examples

*Describe what you need in your own words. You can also use the slash command `/vicert-sales:manage-prospect` for explicit control.*

```
# New prospect — start with the basics
Set up Acme Healthcare Services, mid-size HSO, 250 employees, VP Ops is the champion

# New prospect — more detail upfront
Create a prospect folder for BlueCross Regional, payer, 120K members, interested in AI for claims, met the VP Operations at HITEC, they mentioned spending $380K/yr on 5 SaaS platforms

# New prospect — minimal start
New prospect: HealthFirst Dental, specialty dental plan, 45K members

# Update — add a new contact
Update Acme: CFO is Lisa Park, budget authority, skeptical of custom builds

# Update — add systems and spend data from a call
Add to BlueCross profile: they mentioned spending $380K/yr on 5 SaaS platforms during the call, plus 2 FTEs on reconciliation at $85K each

# Update — deal status changed
Update HealthFirst deal status: discovery scheduled for next week, Q3 budget cycle, CEO and VP Ops attending

# Review — check for gaps before a call
Review BlueCross profile before the discovery call

# Review — quick status check
What's missing in Acme's profile?

# Review — see what we know
Check what we know about HealthFirst
```

#### Pro Tips

- **Start minimal, build over time.** You don't need every field to create a prospect. Start with name and org type, then update after each interaction. A profile that grows naturally is more accurate than one you try to fill out all at once.
- **Update after every interaction.** A quick "update Acme: CFO wants payback under 18 months, next call scheduled for Thursday" takes 10 seconds and keeps the profile current for every other skill.
- **Run a review before discovery calls.** The gap analysis tells you exactly what you don't know yet — feed those gaps into `prep-call` to generate targeted questions.
- **Profiles carry forward across sessions.** The prospect folder lives in your workspace. Close Claude Code, come back next week, and everything is still there. Every skill reads the same profile.
- **Pair with `recap-opportunity`.** After updating a profile with new information, run `recap-opportunity` to see the updated big picture. The recap synthesizes the profile with notes and all prior skill outputs.

---

### 2. `write-outreach` — Prospecting Messages

This skill writes personalized outbound messages that reference real healthcare pain, use specific numbers, and include clear calls to action. It produces messages that sound like you — a knowledgeable industry professional — not like a marketing department.

#### What It Produces

| Message Type | Length | Use When |
|-------------|--------|----------|
| **Cold email** | 150–200 words | First contact with a new prospect |
| **LinkedIn message** | 50–100 words | Connecting on LinkedIn (shorter = better) |
| **Follow-up email** | 100–175 words | Following up on a prior interaction |
| **Re-engagement email** | 100–150 words | Reconnecting after months of silence |
| **3-touch sequence** | 3 emails, escalating value | Structured prospecting campaign |

#### Input Anatomy

The more you provide, the sharper the output:

- **Message type** — What kind of message (cold email, LinkedIn, follow-up, re-engagement, sequence)
- **Prospect role** — Their title matters because the opening angle changes completely (CFO gets cost language, CIO gets architecture language, VP Ops gets productivity language)
- **Organization type** — Healthcare services organization (HSO), payer, provider group, specialty plan, health-tech startup
- **Organization size** — Employees, members, claims volume, funding stage
- **Context** — How you found them, prior interactions, events, referrals
- **Known pain** — Specific problems they've mentioned or you can infer

At minimum, provide: message type + prospect role + organization type.

#### Examples

*Describe what you need in your own words. You can also use the slash command `/vicert-sales:write-outreach` for explicit control.*

```
# Cold email to a CFO — leads with cost
Write a cold email to the CFO of an HSO, 300 employees, spending heavily on SaaS tools for claims processing

# LinkedIn message after meeting someone at a conference
Write a LinkedIn message to the CIO of a regional health plan, met at HITEC, they mentioned struggling with prior auth document processing

# Follow-up after a discovery call
Write a follow-up email to the VP Operations at a specialty dental plan, we discussed how their mainstream SaaS doesn't handle dental adjudication well

# Re-engagement after 6 months of silence
Write a re-engagement email to a health plan CIO we spoke with 6 months ago about AI for claims exception handling, they said timing wasn't right

# Full 3-touch sequence for a cold prospect
Write a 3-touch email sequence for a VP Operations at a mid-size payer, 150K members, likely dealing with manual credentialing and provider onboarding delays

# Cold email to a health-tech startup CTO
Write a cold email to the CTO of a Series B health-tech startup, 40 engineers, open roles unfilled for 3 months, building a claims analytics platform
```

#### With a Prospect Profile

If you've set up a prospect folder with `manage-prospect`, you don't need to repeat org details every time. Just reference the prospect by name and add context specific to this invocation — message type, a trigger event, or a new angle to try.

```
# Follow-up after they opened your last email but didn't reply
Write a follow-up for Acme Healthcare Services — Sarah opened the cold email but didn't reply, it's been 5 days

# LinkedIn message triggered by a job posting
Write a LinkedIn message for Acme Healthcare Services — they just posted a job listing for a "data reconciliation analyst"

# Re-engagement after the deal went quiet
Write a re-engagement email for MidState Health Plan — 3 months since the discovery call, they said timing wasn't right

# 3-touch sequence targeting a new contact at an existing prospect
Write a 3-touch sequence for Acme Healthcare Services targeting the CIO — VP Ops is warm but CIO hasn't engaged yet
```

#### Pro Tips

- **The prospect's role changes everything.** A cold email to a CFO leads with invisible spend. The same prospect's CIO gets a message about platform sprawl. Always include the role.
- **Include context for LinkedIn messages.** "Met at HITEC" or "saw your post about prior auth challenges" makes the difference between a connection accepted and one ignored.
- **Review subject lines carefully.** The skill generates specific, non-clickbait subjects. Make sure they reference the prospect's pain, not your product.
- **Run it twice with different angles.** If you're not sure which pain point will resonate, generate two versions and pick the stronger one.

---

### 3. `prep-call` — Discovery Call Preparation

This skill produces a complete call prep kit that encodes senior sales knowledge — which questions to ask, what signals to listen for, how to position services, and how to respond to objections. It's the difference between walking into a call confident and winging it.

#### What It Produces

The prep kit has 7 sections:

| Section | What It Gives You |
|---------|-------------------|
| **Call Strategy** | Primary service angle, opening approach tailored to attendee roles, key metric to anchor on, conversation goal |
| **Discovery Questions — Prioritized** | 4 tiers: opening questions, deeper qualification, technical/process questions, quantification questions (for ROI) |
| **Likely Objections & Responses** | Top 3–5 objections predicted from the prospect type and attendee mix, with responses drawn from tested battlecards |
| **Proof Points to Reference** | 2–3 most relevant case studies or metrics, with natural ways to introduce them |
| **Signals to Listen For** | Green flags (strong fit), yellow flags (proceed with caution), red flags (consider walking away) |
| **Recommended Next Step** | What to propose at the end of the call — paid discovery, technical walkthrough, pilot, or reconnect later |
| **Quick Reference — Canonical Numbers** | 3–5 key numbers relevant to this service and prospect for quick reference during the call |

#### Input Anatomy

The single most important input is **who's attending the call.** The prep kit adapts the opening approach, question priority, and objection predictions based on attendee roles.

- **Organization type** — Healthcare services organization (HSO), payer, provider group, specialty plan, health-tech startup
- **Organization size** — Employees, members, claims volume, funding stage
- **Attendee roles** — VP Ops, CIO, CFO, CEO, Compliance, CTO (include everyone who'll be in the room)
- **Known pain signals** — What they've mentioned or what triggered the call
- **Prior context** — Previous conversations, how they were sourced

At minimum, provide: organization type + who's attending + any known pain signals.

#### Examples

*Describe what you need in your own words. You can also use the slash command `/vicert-sales:prep-call` for explicit control.*

```
# HSO with known pain and two attendees
Prep me for a call with an HSO, 200 employees, VP Operations and CIO attending, they mentioned "spreadsheets everywhere" and key-person dependency on their claims reconciliation process

# Mid-size payer interested in AI — compliance will be in the room
Prep me for a discovery call with a mid-size payer, 120K members, interested in AI for claims processing, VP Operations and compliance officer attending, they have growing exception queues

# Health-tech startup needing engineering capacity
Prep me for a call with a health-tech startup, Series A, 30 engineers, CTO attending, struggling to ship fast enough, have 4 open engineering roles unfilled for 3 months

# Specialty plan where mainstream tools don't fit
Prep me for a call with a specialty dental plan, 45K members, CEO and VP Operations attending, current SaaS doesn't handle dental adjudication well, considering custom build

# Provider group with operational challenges
Prep me for a call with a provider group, 12 clinics, COO and CFO attending, referral management is manual across all sites, onboarding new providers takes 45 days
```

#### With a Prospect Profile

If you've set up a prospect folder with `manage-prospect`, you don't need to repeat org details. Just reference the prospect by name and add who's attending this specific call and any new context since the last interaction.

```
# Follow-up call with a new stakeholder joining
Prep me for a follow-up call with Acme Healthcare Services — VP Ops and CFO attending this time, CFO wants to understand the financial case

# Technical deep-dive with the CIO
Prep me for a technical call with MidState Health Plan — CIO wants to understand AI agent architecture, compliance officer will sit in

# Call right after the prospect met with a competitor
Prep me for a call with Acme Healthcare Services — they had a presentation from Cognizant last week, VP Ops said "it felt like overkill"
```

#### Pro Tips

- **Always include who's in the room.** A call with only the VP Ops is a different conversation than one with VP Ops + CIO + CFO. The prep kit adjusts the opening, question priority, and objection predictions for each mix.
- **Review the Signals section before the call.** Knowing what green, yellow, and red flags to listen for helps you qualify in real time — not after you've invested weeks.
- **Use the Quantification Questions tier.** These questions extract the numbers you'll need later for the ROI analysis. Getting real numbers during discovery is what makes the `build-roi` output compelling instead of generic.
- **The Recommended Next Step isn't a script.** It's a suggestion based on the prospect profile. Read it before the call so you have a clear ask ready when the moment is right.

---

### 4. `compete` — Competitive Positioning

This skill produces honest competitive positioning briefs. When a prospect says "we're also looking at Accenture" or "our CIO says we can build it in-house," this gives you the differentiators, the questions to ask, the objections to expect, and — critically — where Vicert is genuinely vulnerable.

#### What It Produces

The competitive brief has 8 sections:

| Section | What It Gives You |
|---------|-------------------|
| **Their Pitch** | Honest, fair summary of the alternative's best argument (no strawmen) |
| **Our Counter-Position** | 4–6 specific differentiators with supporting evidence |
| **Questions That Expose Weaknesses** | 5–7 questions that lead the prospect to discover gaps themselves |
| **Objections They'll Raise About Us** | 4–6 objections with underlying concerns and responses |
| **Where We're Vulnerable** | 2–4 areas where the competitor has a legitimate advantage, with mitigation strategies |
| **Proof Points for This Matchup** | 2–3 case studies most relevant to this specific competitive situation |
| **Recommended Positioning Statement** | 2–3 sentence positioning for when they ask "why should we pick you?" |
| **The One Thing to Remember** | Single most important takeaway — your mental anchor for the conversation |

#### Competitor Categories Covered

The skill has detailed positioning data for 11 types of alternatives:

| Category | Example Situations |
|----------|-------------------|
| In-house build | "Our CIO says we can build it ourselves" |
| Offshore dev shop | "We found a team in India for half the cost" |
| Big consultancy | "We're evaluating Accenture / Deloitte / Cognizant" |
| SaaS vendor | "Why not just buy HealthEdge / TriZetto / Jiva?" |
| Staff augmentation | "We'll just hire contractors through Robert Half" |
| Low-code / no-code | "We're looking at Appian / OutSystems / Salesforce Health Cloud" |
| Another custom dev shop | "We have a quote from another boutique firm" |
| Doing nothing / status quo | "It works well enough, why change?" |
| Healthcare AI vendor | "Waystar already has AI features" |
| Internal AI experiment | "Our data science team wants to build it" |
| RPA / traditional automation | "We're already using UiPath" |

#### Examples

*Describe what you need in your own words. You can also use the slash command `/vicert-sales:compete` for explicit control.*

```
# vs. in-house build — CIO wants to keep it internal
The prospect's CIO says they can build the workflow automation system in-house with their existing dev team of 5 engineers — how do we position against that?

# vs. big consultancy — prospect got a high quote
Our HSO prospect got a $1.8M quote from Cognizant for a custom claims platform, we quoted $275K, they're skeptical of the price difference

# vs. SaaS — prospect wants to buy, not build
A mid-size payer prospect wants to buy HealthEdge instead of building a custom platform, their VP Ops is open but CIO prefers the SaaS route — how do we compete?

# vs. doing nothing — no urgency
A specialty plan prospect is leaning toward doing nothing about their manual credentialing process — "it works well enough"

# vs. offshore — pure cost comparison
A health-tech startup is comparing our pod model to an offshore team from Toptal for their product build, CTO is focused on cost per engineer

# vs. RPA for an AI use case
A mid-size payer is considering UiPath for prior auth document processing instead of our AI agent approach, their automation team is pushing for RPA
```

#### With a Prospect Profile

If you've set up a prospect folder with `manage-prospect`, you don't need to repeat org details. Just reference the prospect by name and specify which competitor or alternative you're up against.

```
# CIO wants to build in-house instead
Acme Healthcare Services's CIO says his team of 5 engineers can build the claims platform in-house — how do we position?

# New stakeholder pushing back on urgency
MidState Health Plan's CFO says the current process "works well enough" and doesn't see the urgency — how do we handle that?

# Prospect comparing our rate to offshore
Pulse Health is comparing our pod rate to an offshore quote from Toptal that's 40% cheaper — how do we position?
```

#### Pro Tips

- **Read "Where We're Vulnerable" first.** This is the section that prevents you from being blindsided in a meeting. Reps who acknowledge a vulnerability honestly and redirect gain trust. Reps who are surprised lose credibility.
- **Run it for multiple competitors if needed.** If the prospect is evaluating both a SaaS vendor and a consultancy, run the skill twice and combine the insights.
- **Don't badmouth.** The brief gives you specific differentiators and questions — not ammunition for attacks. Use data and proof points, not emotions.
- **The "Questions That Expose Weaknesses" section is gold.** These questions lead the prospect to discover the alternative's gaps on their own, which is far more persuasive than you pointing them out.

---

### 5. `write-proposal` — Sales Documents

This skill produces prospect-specific sales documents grounded in Vicert's actual pricing, case studies, and competitive positioning. Every document uses real numbers and battle-tested language — not generic marketing content.

#### What It Produces

| Document Type | Length | Best For |
|--------------|--------|----------|
| **One-pager** | 1 page | Quick summary to share after initial interest |
| **Pitch email** | 150–250 words | Emailing a specific stakeholder with a tailored value prop |
| **Executive proposal** | Multi-page | Formal proposal after discovery, with scope, timeline, investment, ROI |
| **Capability summary** | 1–2 pages | "What does Vicert do?" overview tailored to their segment |
| **Follow-up email** | 200–300 words | Post-call follow-up referencing what was discussed |

#### Input Anatomy

The skill needs three things to produce a sharp document:

1. **Document type** — Which format (one-pager, pitch email, executive proposal, capability summary, follow-up email)
2. **Prospect details** — Organization type, size, pain points, competitive context
3. **Stakeholder roles** — Who will read this document? A one-pager for a CFO reads completely differently from one for a VP Operations.

At minimum, provide: document type + organization type + a sense of their pain.

#### Examples

*Describe what you need in your own words. You can also use the slash command `/vicert-sales:write-proposal` for explicit control.*

```
# One-pager for an HSO with SaaS sprawl — CFO audience
Write a one-pager for a mid-size HSO, 150 employees, drowning in claims reconciliation across 4 SaaS tools, CFO is the primary reader

# Pitch email targeting a specific role
Write a pitch email to the VP Operations at a regional health plan, 80K members, interested in automating their credentialing process

# Executive proposal after discovery
Write an executive proposal for a specialty dental plan, 45K members, needs custom adjudication platform, VP Ops and CFO will review, currently spending ~$280K/yr on tools plus manual workarounds

# Capability summary for a health-tech startup
Write a capability summary for a Series B health-tech startup building a claims analytics platform, CTO audience, they need to understand our pod model and health-tech engagement approach

# Follow-up email after a specific call
Write a follow-up email after the discovery call with a mid-size payer, 120K members, we discussed their growing prior auth exception queue and how AI agents could handle document extraction, VP Operations and compliance officer attended

# One-pager for a provider group
Write a one-pager for a provider group with 12 clinics, COO is the champion, referral management is manual across all sites, they want to understand workflow automation
```

#### With a Prospect Profile

If you've set up a prospect folder with `manage-prospect`, you don't need to repeat org details. Just reference the prospect by name and specify the document type, the audience for this particular document, and any new context (e.g., what was discussed in a recent call).

```
# One-pager for a different stakeholder at the same prospect
Write a one-pager for Acme Healthcare Services — CFO audience, she cares about payback period

# Follow-up email referencing a specific demo
Write a follow-up email for MidState Health Plan — we demoed the AI document extraction approach, compliance officer asked about PHI handling and HITRUST

# Executive proposal leveraging competitive context already in the profile
Write an executive proposal for Acme Healthcare Services — include the Cognizant comparison, VP Ops will present it internally

# Capability summary for a technical reader
Write a capability summary for Pulse Health — VP Engineering audience, focus on FHIR integration experience and pod ramp-up timeline
```

#### Pro Tips

- **Include stakeholder roles.** The same one-pager reads differently when the audience is a CFO (lead with cost and payback) versus a CIO (lead with architecture and maintenance burden) versus a VP Ops (lead with productivity and risk reduction).
- **Follow-up emails need specific call details.** Don't just say "follow-up email for a payer." Include what was discussed, what pain points came up, and who was in the room. The skill will reference these specifics, which shows the prospect you were listening.
- **Executive proposals work best after discovery.** The more real data you can feed in — actual SaaS spend, FTE count, specific workflows — the more compelling the proposal. Generic proposals with ranges are less persuasive than proposals with real numbers.
- **Use the "Usage Notes" section.** Every document comes with notes on assumptions made and suggested customizations. Read these before sending.

---

### 6. `build-roi` — ROI Analysis

This skill produces credible, shareable ROI analysis documents designed for one specific purpose: helping your internal champion build the business case with their CFO. The output is clean, professional, honest about assumptions, and compelling without being salesy.

#### What It Produces

The ROI document includes:

| Section | What It Contains |
|---------|-----------------|
| **Executive Summary** | 3–4 sentences: current cost, proposed investment, payback period, "why now" |
| **Current Cost of the Problem** | Itemized annual cost table with each line item sourced (prospect-provided vs. estimated) |
| **Proposed Investment** | Itemized Vicert solution cost with timeline notes |
| **Financial Impact — 3-Year View** | Year-by-year comparison: status quo cost vs. Vicert investment vs. net savings |
| **Payback Period** | Calculated payback with confidence range |
| **What's NOT in This Math** | Costs and benefits intentionally excluded — builds credibility |
| **Assumptions & Caveats** | Every assumption clearly listed and categorized |
| **Recommended Next Step** | Paid discovery or scoping session, framed based on data confidence |

#### Input Anatomy

This skill benefits most from **specific numbers.** Every real number you provide replaces a range estimate and makes the output more persuasive.

Numbers that matter most:
- **Annual SaaS/tool spend** — What they're paying for their current tools
- **FTE count on the process** — How many people work on this
- **Salary per FTE** — Fully loaded (or the skill uses industry ranges)
- **Percentage of time on the process** — Are they full-time on it or 60%?
- **Volume metrics** — Claims per year, providers per year, authorizations per year
- **Error rates** — If known, even an estimate helps
- **Growth rate** — Is their volume growing? SaaS costs increasing?

You can provide as few or as many of these as you have. The skill uses canonical ranges from Vicert's battlecards for anything you don't provide, and clearly flags which numbers are estimates.

#### Examples

*Describe what you need in your own words. You can also use the slash command `/vicert-sales:build-roi` for explicit control.*

```
# Custom Platform ROI with good data
Build an ROI analysis for an HSO spending $420K/yr on 5 SaaS platforms, 2 FTEs on reconciliation ($85K each fully loaded), looking at a custom claims platform, processing 300K claims/year

# Workflow Automation ROI with partial data
Build an ROI analysis for a health plan with 3 staff spending 60% of time on manual credentialing, average salary $72K, processing 400 providers/year, audit prep takes 2 weeks every quarter

# AI Agents ROI
Build an ROI analysis for a prior auth team of 8 people, 75% of time on admin extraction from faxed documents, processing 50K auths/year, average salary $65K, exception queue growing 10% quarter over quarter

# Specialty plan with SaaS that doesn't fit
Build an ROI analysis for a specialty dental plan, 45K members, spending $280K/yr on mainstream claims tools plus $120K in manual workaround labor because the tools don't handle dental adjudication properly

# Health-tech build-vs-hire comparison
Build an ROI analysis for a Series B health-tech startup, 40 engineers, 4 open roles unfilled for 3 months, monthly burn $250K, need to ship a claims analytics feature by Q3 to hit a revenue milestone

# Workflow Automation with minimal data
Build an ROI analysis for a mid-size payer, 120K members, compliance reporting runs on spreadsheets, 2 FTEs spend most of their time on it, audit prep is painful every quarter
```

#### With a Prospect Profile

If you've set up a prospect folder with `manage-prospect`, the profile already contains org details, systems, and spend numbers. Just reference the prospect by name and add any new numbers from recent conversations — the skill combines profile data with what you provide.

```
# ROI update with fresh numbers from a recent call
Build an ROI analysis for Acme Healthcare Services — just learned they also spend $25K/yr on audit prep labor and $18K on compliance reporting tools

# ROI scoped to phase 1 only
Build an ROI analysis for MidState Health Plan — scope to phase 1 only: prior auth document extraction, not the full claims AI rollout

# Build-vs-hire comparison for the startup
Build an ROI for Pulse Health — compare pod model at 3 engineers for 6 months vs. hiring 3 FTEs at $180K fully loaded each
```

#### Pro Tips

- **Every real number you provide replaces a range estimate.** "$420K/yr on 5 SaaS platforms" is infinitely more persuasive than "$250–400K typical range." Get the numbers during discovery (the `prep-call` skill includes quantification questions for exactly this purpose).
- **The output is designed for CFO forwarding.** It's clean, professional, assumption-transparent, and free of sales language. Your champion can forward it to their finance team without you being in the room.
- **Don't hide unfavorable math.** If the ROI doesn't pencil (payback > 24 months), the skill will tell you honestly and suggest rescoping. That honesty builds more trust than forced math that breaks under scrutiny.
- **Use the "What's NOT in This Math" section as a conversation starter.** It lists qualitative benefits (risk reduction, compliance improvement, scalability) that don't have dollar values but matter to decision-makers.

---

### 7. `recap-opportunity` — Deal Recap

This skill synthesizes everything in a prospect's folder — profile, notes, and all prior skill outputs — into a single consolidated internal recap. It's designed for pipeline reviews, rep handoffs, manager check-ins, or refreshing your own memory before re-engaging with a prospect.

The output is **internal only** — candid, evidence-based, and honest about gaps and risks. It includes a deal health assessment that will say "this deal is stalling" when the evidence supports it.

#### What It Produces

The recap has 12 sections:

| Section | What It Contains |
|---------|-----------------|
| **Opportunity Snapshot** | 3-4 sentence executive summary of who, what, where the deal stands, and what's next |
| **Organization** | Type, size, location |
| **Key People** | Contacts table with "Role in Deal" column (champion, decision-maker, blocker, etc.) |
| **Pain Points & Opportunity** | Quantified where possible, sourced to profile/notes/calls |
| **Service Fit** | Which Vicert service and why, plus secondary opportunities |
| **Engagement History** | Chronological timeline built from notes and skill output dates |
| **Current Deal Status** | Stage, timeline, budget, decision process, next step |
| **Competitive Landscape** | Who else they're evaluating |
| **Materials Produced** | Inventory of all skill outputs with dates |
| **Deal Health Assessment** | Momentum, risk flags, champion strength, overall assessment (internal/subjective) |
| **Knowledge Gaps** | What we don't know that we should |
| **Recommended Next Actions** | Prioritized 3-5 actions |

#### When to Use It

- **Pipeline review** — Generate recaps for your active deals before a team meeting
- **Rep handoff** — Get a comprehensive brief when taking over someone else's deal
- **Manager check-in** — Give your manager a quick read on where a deal stands
- **Refreshing your memory** — Coming back to a deal after weeks away
- **Before re-engaging** — Get caught up on everything before calling or emailing a prospect

#### Input Anatomy

This skill needs just one thing: the prospect name. It reads everything else from the prospect folder.

At minimum, provide: the prospect name (matching an existing prospect folder).

#### Examples

*Describe what you need in your own words. You can also use the slash command `/vicert-sales:recap-opportunity` for explicit control.*

```
# Standard opportunity recap
Recap Acme Healthcare Services

# Quick status check
Where are we with MidState Health Plan?

# Refresh before re-engaging
Refresh me on Pulse Health — I haven't looked at this deal in 3 weeks

# Pipeline review prep
Give me a deal summary for BlueCross Regional
```

#### With a Prospect Profile

This skill is designed to work with prospect folders. The more context in the folder — profile, notes, prior skill outputs — the richer the recap.

```
# After several weeks of engagement
Recap Acme Healthcare Services

# Before a pipeline review — run for each active deal
Where are we with Acme Healthcare Services?
Where are we with MidState Health Plan?
Where are we with Pulse Health?
```

#### Pro Tips

- **Run it before every pipeline review.** A 30-second recap is faster than re-reading a week's worth of notes and outputs.
- **Use Knowledge Gaps to prep your next call.** The gaps section tells you exactly what questions to ask next — feed them into `prep-call` for a targeted discovery kit.
- **Pay attention to Deal Health Assessment.** It's intentionally candid. If it says "stalling," that's a signal to change your approach, not a criticism.
- **The recap is read-only.** It never modifies your profile, notes, or prior outputs. It only creates a new recap file. Safe to run anytime.
- **Run it after updating the profile.** After you use `manage-prospect update` to add new information, run `recap-opportunity` to see the updated picture. The recap reflects whatever is in the folder at the time you run it.

---

## Using Skills Together Through the Sales Cycle

Each skill is powerful on its own, but they're designed to work together. Here's how they connect:


```
SETUP            PROSPECTING      DISCOVERY      POSITIONING      PROPOSAL      CLOSE
manage-prospect → write-outreach → prep-call   → compete       → write-proposal → build-roi
                                       ↑ manage-prospect (update after each interaction)
                  ←———————— recap-opportunity (use at any stage for a consolidated view) ————————→
```

The key workflow: **set up the prospect profile once, then invoke skills with short arguments.** Use `manage-prospect` at the start of a deal to create the profile, and again after each interaction to capture new information. Every subsequent skill reads the accumulated profile automatically — so you describe the prospect once, not on every invocation.

The scenarios below demonstrate this. The first skill invocation uses full inline details (since the profile was just created). After that, each invocation references the prospect by name plus only the new context for that step.

### Scenario 1: Cold Outreach to Signed Deal — Healthcare Services Organization

**The prospect:** A mid-size healthcare services organization, 250 employees, spending on multiple SaaS platforms with manual reconciliation in between.

**Step 0 — Set up the prospect profile:**
```
Set up a prospect folder for Acme Healthcare Services — mid-size, 250 employees, VP Operations is our contact, likely spending on 4-5 SaaS platforms with staff doing manual reconciliation
```

**Step 1 — Generate outreach (first touch — full details since the profile was just created):**
```
Write a cold email to a VP Operations at a mid-size healthcare services organization, 250 employees, likely spending on 4-5 SaaS platforms with staff doing manual reconciliation
```

**Step 2 — They respond. Prep for the discovery call:**
```
Prep me for a call with Acme Healthcare Services — VP Operations and CIO attending, they mentioned "we have people whose whole job is copying data between platforms"
```

**Step 3 — After discovery, update the profile with what you learned:**
```
Update Acme Healthcare Services: CIO is Mike Torres, skeptical of custom vs. SaaS. CFO is Lisa Park, budget authority. Spending $380K/yr across 5 SaaS platforms, 2 FTEs on reconciliation at $80K each. Also evaluating Cognizant, got a $1.2M quote from them.
```

**Step 4 — They mentioned Cognizant. Get competitive intel:**
```
Acme Healthcare Services is evaluating Cognizant for a custom claims platform, they got a $1.2M quote vs. our $250K — how do we position against that?
```

**Step 5 — Call went well. Send a proposal:**
```
Write an executive proposal for Acme Healthcare Services, VP Ops is champion, CIO is technical approver, CFO controls budget
```

**Step 6 — Champion needs to build the internal case. Generate the ROI:**
```
Build an ROI analysis for Acme Healthcare Services, SaaS costs increasing ~8% annually, add $25K/yr in audit prep labor
```

Notice how Steps 5 and 6 are short — the profile already contains the org details, spend numbers, contacts, and competitive context. You only add what's new for this step.

### Scenario 2: Inbound Lead Through Close — Mid-Size Payer

**The prospect:** A regional health plan, 150K members. VP Operations reached out after reading a case study. Interested in AI for claims processing.

**Step 0 — Set up the prospect profile:**
```
Set up a prospect folder for MidState Health Plan — regional payer, 150K members, VP Operations reached out after reading our chart review AI case study, interested in AI for claims exception handling
```

**Step 1 — Send a tailored response (first touch — full details):**
```
Write a follow-up email to the VP Operations at a regional health plan, 150K members, they reached out after reading our chart review AI case study, interested in AI for claims exception handling
```

**Step 2 — Prep for the discovery call (compliance will attend):**
```
Prep me for a call with MidState Health Plan — VP Operations, CIO, and compliance officer attending, prior auth exception queue has been growing
```

**Step 3 — After discovery, update the profile:**
```
Update MidState: prior auth team of 6, average salary $68K, 70% time on admin extraction from faxed docs, processing 45K auths/year. Currently using UiPath for simple cases but exception queue growing 15% per quarter. UiPath investment $80K/yr. CIO and compliance both need to approve.
```

**Step 4 — Their RPA isn't keeping up. Get competitive positioning:**
```
MidState is considering whether to expand their UiPath RPA or try an AI agent approach — how should we position?
```

**Step 5 — Send a one-pager to circulate internally:**
```
Write a one-pager for MidState, CIO and compliance are the audience
```

**Step 6 — Full executive proposal:**
```
Write an executive proposal for MidState Health Plan
```

**Step 7 — Build the financial case for the CFO:**
```
Build an ROI analysis for MidState, add denial recovery estimated at $200K/yr opportunity
```

Steps 5–7 are concise because the profile already has the team size, salaries, time allocation, volume, current tools, and growth rate — all captured in the Step 3 update.

### Scenario 3: Health-Tech Startup

**The prospect:** A Series B health-tech startup building a remote patient monitoring platform. 35 engineers, 5 open roles, burning $200K/month.

**Step 0 — Set up the prospect profile:**
```
Set up a prospect folder for Pulse Health — health-tech startup, Series B, 35 engineers, 5 open roles unfilled for 4 months, building a remote patient monitoring platform, monthly burn $200K, need FHIR integration and clinical workflow features
```

**Step 1 — Cold outreach to the CTO (first touch — full details):**
```
Write a cold email to the CTO of a Series B health-tech startup, 35 engineers, 5 open roles unfilled, building a remote patient monitoring platform, monthly burn $200K
```

**Step 2 — Prep for the call:**
```
Prep me for a call with Pulse Health — CTO and VP Engineering attending
```

**Step 3 — After the call, update the profile:**
```
Update Pulse Health: CTO is primary decision-maker, focused on cost per engineer and time to productivity. Need to ship FHIR integration by Q3 to hit revenue milestone. Considering offshore as alternative.
```

**Step 4 — CTO asks why not just hire offshore:**
```
Pulse Health is comparing our pod model to offshore for FHIR integration and clinical workflows — how do we position?
```

**Step 5 — Send a capability summary:**
```
Write a capability summary for Pulse Health, CTO audience, focus on pod model vs. hiring
```

**Step 6 — Build-vs-hire ROI:**
```
Build an ROI analysis for Pulse Health, hiring timeline is 6+ months per role, comparing pod model vs. hiring vs. offshore
```

Steps 4–6 are short because the profile carries the prospect details, and each invocation adds only the context specific to that step.

---

## Getting the Best Output

### The Golden Rule: Specificity

The single biggest factor in output quality is how specific your input is. Compare:

**Vague input:**
```
Write a cold email to someone at a health plan
```

**Rich input:**
```
Write a cold email to the VP Operations at a regional health plan, 120K members, likely dealing with manual credentialing across 300+ providers, we met briefly at AHIP conference
```

**With a profile already set up:**
```
Write a cold email to Acme Healthcare Services — we met their VP Ops at AHIP
```

The vague input produces a generic message. The rich input produces a message that references their role-specific pain, uses relevant metrics, and sounds like someone who understands their world. The profile-enabled input is just as specific — the details come from the profile instead of the arguments.

### What to Always Include

Across all skills, these details consistently improve output quality:

| Detail | Why It Matters |
|--------|---------------|
| **Organization type** | HSO vs. payer vs. specialty plan changes the pain language, metrics, and service recommendation |
| **Organization size** | Drives investment ranges, typical pain points, and decision-maker profiles |
| **Prospect's role** | Changes the opening angle, metric emphasis, and language register entirely |
| **Specific pain point** | "Manual reconciliation across 4 platforms" beats "operational challenges" |
| **Competitive context** | If they're evaluating alternatives, mention it — the output adjusts positioning |

### Iterating on Output

- **Run the same skill multiple times.** Different runs produce different angles. If the first cold email leads with cost savings, run it again — the next might lead with key-person risk. Pick the stronger version.
- **Use output from one skill as input for another.** The numbers you uncover during a prep-call-informed discovery feed directly into `build-roi`. The competitive context from `compete` strengthens a `write-proposal` output.
- **Add details as you learn them.** After a discovery call, re-run `write-proposal` or `build-roi` with the specific numbers you learned. The output will be dramatically more compelling.
- **Update the profile as you go.** After a discovery call surfaces new contacts, pain points, or spend numbers, use `manage-prospect update` to capture them. Every subsequent skill run reads the updated profile automatically.

### Adapting for Different Stakeholders

The same prospect often requires different documents for different audiences:

```
# One-pager for the VP Operations champion
Write a one-pager for an HSO, 200 employees, SaaS consolidation opportunity, VP Operations audience — lead with productivity and risk reduction

# Same prospect, but for the CFO
Write a one-pager for an HSO, 200 employees, SaaS consolidation opportunity, CFO audience — lead with cost breakdown and payback period

# Same prospect, but for the CIO
Write a one-pager for an HSO, 200 employees, SaaS consolidation opportunity, CIO audience — lead with architecture simplification and maintenance burden reduction
```

---

## Knowledge Behind the Skills

All skills draw from the same internal reference library. You don't need to read these files — the skills pull from them automatically. But knowing what's there helps you understand where the output comes from.

| Reference File | What It Contains |
|----------------|-----------------|
| Services Overview | Canonical pricing, service descriptions, pod model, proof points, universal objections |
| Service Selection Guide | Segmentation by org type, signal checklists, conversation starters by role, qualification matrix |
| Battlecard — Custom Platforms | Discovery questions, ROI math, objections, competitive positioning, phrases that work |
| Battlecard — Workflow Automation | Discovery questions, ROI math, objections, competitive positioning, phrases that work |
| Battlecard — AI Agents | Discovery questions, ROI math, human-in-the-loop model, competitive positioning, phrases that work |
| Battlecard — Health-Tech | Engagement models, build-vs-hire math, objections, competitive positioning, phrases that work |
| Success Stories (18) | Full narratives with challenge/solution/benefit and client names |
| AI Deep Dives (3) | Detailed case studies for the three AI agent stories |

### Vicert's Four Services at a Glance

| Service | Typical Investment | Payback | When It Fits |
|---------|-------------------|---------|-------------|
| Custom Healthcare Platforms | $200–300K build + $40–60K/yr | 8–14 months | Overlapping SaaS tools, manual reconciliation, $200K+/yr problem |
| Workflow Automation | $150–250K build + ~$30K/yr | 12–18 months | Spreadsheets, key-person dependency, $75K+/yr problem |
| AI Agent Systems | $50–80K pilot, $150–250K production + $40–60K/yr | Varies by scope | Growing exception queues, document variation, $150K+/yr problem |
| Health-Tech Engagement | $30–50K/month per pod | Build-vs-hire comparison | Startup needing engineering capacity with healthcare expertise |

Paid Discovery ($15–25K) is available for all services and has standalone value regardless of whether the prospect proceeds.

---

## All Skills at a Glance

*Most of the time, just describe what you need and Claude Code picks the right skill. If you want to force a specific skill, use these commands:*

| Command | What You Get |
|---------|-------------|
| `/vicert-sales:write-outreach [type] [prospect]` | Cold email, LinkedIn, follow-up, re-engagement, or 3-touch sequence |
| `/vicert-sales:prep-call [prospect]` | Full discovery call prep kit |
| `/vicert-sales:compete [situation]` | Competitive positioning brief |
| `/vicert-sales:write-proposal [type] [prospect]` | One-pager, pitch email, executive proposal, capability summary, or follow-up email |
| `/vicert-sales:build-roi [scenario]` | ROI analysis with cost breakdown and payback timeline |
| `/vicert-sales:manage-prospect [action] [prospect] [details]` | New prospect folder + profile, profile updates, or profile gap review |
| `/vicert-sales:recap-opportunity [prospect-name]` | Consolidated internal deal recap with health assessment and next actions |
| `/vicert-sales:help [skill-name]` | Quick reference card for all skills, or detailed help for a specific skill |

---

## FAQ

**Can I use multiple skills for the same prospect?**
Yes — that's how they're designed. See the "Using Skills Together" section above. The output from earlier skills informs later ones.

**What if I don't have much information about the prospect?**
The skills work with minimal input (message type + role + org type). But more detail produces dramatically better output. Even adding one specific pain point or the prospect's title makes a measurable difference.

**Should I send the output directly to prospects?**
Review it first. The skills produce strong drafts, but you should personalize details, verify that proof points match the prospect's situation, and make it sound like you. The output is a starting point, not a finished product.

**What if the prospect doesn't fit neatly into one service?**
Describe the situation as you understand it. The skills are smart enough to recommend the right service or combination based on the pain signals you describe. If the prospect's needs span multiple services, the output will note the primary recommendation and mention secondary opportunities.

**Can I run the same skill twice for the same prospect?**
Absolutely. Different runs can produce different angles. This is especially useful for `write-outreach` (try different pain angles) and `write-proposal` (generate versions for different stakeholders).

**What are the canonical pricing ranges I should know?**
Custom Platforms: $200–300K build. Workflow Automation: $150–250K (mid-size org). AI Agents: $50–80K pilot, $150–250K production. Health-Tech: $30–50K/month per pod. Paid Discovery: $15–25K for all services. The skills use these automatically, but it helps to know them for live conversations.

**Do I have to remember command names?**
No. Just describe what you need — "Write me a cold email to a VP Ops at an HSO" or "Prep me for my discovery call with Acme" — and Claude Code picks the right skill automatically. If you prefer explicit control, you can use slash commands like `/vicert-sales:write-outreach` to force a specific skill. See the [command reference](#all-skills-at-a-glance) for the full list.

**How do I keep context when I come back to a deal days later?**
Set up a working folder (see "Setting Up Your Sales Workspace" above). As long as you point Claude Code at the same folder, it reads the prior outputs saved in the prospect's subfolder and builds on them. You can run `write-outreach` on Monday, close the session, come back Thursday for `prep-call`, and Claude Code picks up the accumulated context — prospect details, pain points, numbers gathered, competitive landscape — from the files.

**Can I keep working on the same prospect across multiple messages?**
Yes. Within a single session, Claude Code maintains context automatically — you can run `write-outreach` in one message, then run `prep-call` for the same prospect in the next message and reference earlier output. For cross-session continuity (coming back days or weeks later), set up a working folder so outputs are saved as files and context carries forward automatically. See "Setting Up Your Sales Workspace" above.
