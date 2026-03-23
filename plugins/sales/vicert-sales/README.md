# Vicert Sales Toolkit Plugin

Vicert's complete sales enablement toolkit — seven skills covering the full sales cycle from prospecting through proposal, plus prospect management and deal recaps, grounded in Vicert's actual services, pricing, proof points, and competitive positioning.

**New to the plugin?** Read the [User Guide](USERS-GUIDE.md) for detailed examples, input tips, and multi-skill workflows.

## Install

```bash
/plugin install vicert-sales@vicert-internal
```

### Optional: Set Up a Sales Workspace

To save outputs as organized files and carry context across sessions, copy the included workspace template into a working folder:

```bash
mkdir -p ~/Sales
cp ~/.claude/plugins/vicert-sales/workspace/CLAUDE.md ~/Sales/CLAUDE.md
```

Then point Cowork at `~/Sales` when you start a session. You can also add prospect profiles (`profile.md`), meeting notes, and call transcripts to each prospect's folder — every skill reads them automatically so you never re-describe a prospect. See the [User Guide](USERS-GUIDE.md#setting-up-your-sales-workspace) for details.

## Commands

| Command | Purpose |
|---------|---------|
| `/vicert-sales:write-proposal [type] [prospect]` | Generate sales documents (one-pagers, proposals, pitch emails, capability summaries, follow-ups) |
| `/vicert-sales:prep-call [prospect]` | Generate discovery call preparation packages with questions, objections, and proof points |
| `/vicert-sales:write-outreach [type] [prospect]` | Generate outbound messages (cold emails, LinkedIn, follow-ups, re-engagement, sequences) |
| `/vicert-sales:compete [situation]` | Generate competitive positioning briefs against specific alternatives |
| `/vicert-sales:build-roi [scenario]` | Generate prospect-specific ROI analyses with cost breakdowns and payback timelines |
| `/vicert-sales:manage-prospect [action] [prospect] [details]` | Create, update, or review prospect folders and profile.md files |
| `/vicert-sales:recap-opportunity [prospect-name]` | Generate a consolidated internal recap of where a deal stands |
| `/vicert-sales:help [skill-name]` | Show available skills or detailed help for a specific skill |

## Skills

### write-proposal

Generate tailored sales documents — one-pagers, executive proposals, pitch emails, capability summaries, and follow-up emails.

```bash
# One-pager for an HSO prospect
/vicert-sales:write-proposal one-pager for a mid-size HSO, 150 employees, drowning in claims reconciliation across 4 SaaS tools, CFO is the decision-maker

# Follow-up email after a discovery call
/vicert-sales:write-proposal follow-up email after discovery call with a specialty dental plan struggling with prior auth paperwork

# Executive summary for a health-tech startup
/vicert-sales:write-proposal executive summary for a Series B health-tech startup that needs to scale engineering without hiring

# Pitch email to a specific role
/vicert-sales:write-proposal pitch email to VP Operations at a regional health plan, 80K members, interested in workflow automation

# With a prospect profile set up — Cowork reads it automatically
/vicert-sales:write-proposal executive proposal for Acme Healthcare Services, CFO audience
```

### prep-call

Generate complete discovery call preparation packages with opening strategy, prioritized questions, objection responses, proof points, and signals to listen for.

```bash
# HSO with known pain signals
/vicert-sales:prep-call HSO with 200 employees, VP Operations and CIO attending, they mentioned "spreadsheets everywhere"

# Mid-size payer interested in AI
/vicert-sales:prep-call mid-size payer, 120K members, interested in AI for claims processing, compliance officer will be on the call

# Health-tech startup
/vicert-sales:prep-call health-tech startup, Series A, 30 engineers, struggling to ship fast enough

# With a prospect profile set up — Cowork reads it automatically
/vicert-sales:prep-call Acme Healthcare Services, VP Operations and CIO attending
```

### write-outreach

Generate personalized outbound sales messages that sound like a knowledgeable healthcare professional, not a marketing template.

```bash
# Cold email to a VP Operations
/vicert-sales:write-outreach cold email to a VP Operations at a regional health plan, 80K members, likely paying for multiple SaaS tools

# LinkedIn message after a conference
/vicert-sales:write-outreach LinkedIn message to CIO of an HSO after meeting at HITEC conference

# Follow-up sequence for a stalled deal
/vicert-sales:write-outreach follow-up sequence (3 emails) for a prospect who went dark after a discovery call about workflow automation

# With a prospect profile set up — Cowork reads it automatically
/vicert-sales:write-outreach cold email to Acme Healthcare Services — we met their VP Ops at AHIP
```

### compete

Generate focused competitive positioning briefs when a prospect is evaluating alternatives — in-house build, offshore, consultancies, SaaS vendors, staff augmentation, and more.

```bash
# vs. offshore development
/vicert-sales:compete prospect is comparing us to hiring an offshore team for a custom platform build

# vs. big consultancy
/vicert-sales:compete prospect is evaluating Accenture for a workflow automation engagement

# vs. status quo
/vicert-sales:compete prospect is leaning toward doing nothing — "it works well enough"

# With a prospect profile set up — Cowork reads it automatically
/vicert-sales:compete Acme Healthcare Services is evaluating Cognizant for a custom platform build
```

### build-roi

Generate prospect-specific ROI analysis documents with cost breakdowns, investment projections, payback timelines, and shareable financial summaries.

```bash
# Custom Platform ROI
/vicert-sales:build-roi HSO spending $420K/yr on 5 SaaS platforms, 2 FTEs on reconciliation ($85K each), looking at a custom platform

# Workflow Automation ROI
/vicert-sales:build-roi health plan with 3 staff spending 60% of time on manual credentialing, average salary $72K, processing 400 providers/year

# AI Agents ROI
/vicert-sales:build-roi prior auth team of 8 people, 75% admin extraction time, processing 50K auths/year, considering AI agents

# With a prospect profile set up — Cowork reads it automatically
/vicert-sales:build-roi Acme Healthcare Services, add $25K/yr in audit prep labor, SaaS costs increasing ~8% annually
```

### manage-prospect

Create, update, and review prospect folders and profiles in your sales workspace. Handles the full lifecycle of prospect information — from initial setup to ongoing maintenance.

```bash
# Set up a new prospect folder with pre-populated profile
/vicert-sales:manage-prospect set up Acme Healthcare Services, mid-size, 250 employees, VP Ops is the champion

# Update an existing profile with new information
/vicert-sales:manage-prospect update Acme: CFO is Lisa Park, budget authority, skeptical

# Review a profile for gaps before a call
/vicert-sales:manage-prospect what's missing in Acme's profile?
```

### recap-opportunity

Generate a consolidated internal recap of where a deal stands — synthesizes the prospect profile, notes, and all prior skill outputs into a single document for pipeline reviews, rep handoffs, manager check-ins, or refreshing your own memory.

```bash
# Full opportunity recap
/vicert-sales:recap-opportunity Acme Healthcare Services

# Quick deal status check
/vicert-sales:recap-opportunity where are we with MidState Health Plan?

# Refresh before re-engaging
/vicert-sales:recap-opportunity refresh me on Pulse Health

# Pipeline review prep
/vicert-sales:recap-opportunity BlueCross Regional
```

## What's Included

All skills share a common reference library:

- **Services Overview** — Canonical pricing, service descriptions, pod model, proof points
- **4 Battlecards** — Custom Platforms, Workflow Automation, AI Agents, Health-Tech with discovery questions, ROI math, objections, competitive positioning, and "phrases that work"
- **Service Selection Guide** — Segmentation by org type, signal checklists, conversation starters by role
- **18 Success Stories** — Full narratives with metrics and client names
- **AI Deep Dives** — Detailed case studies for the three AI agent stories
