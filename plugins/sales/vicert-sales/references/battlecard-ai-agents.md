# AI Agent Systems

## Sales Battlecard — Internal Use Only

---

## The Elevator Pitch

> You've automated the easy stuff. What's left — the ambiguous claims, the documents with variation, the exception queues that keep growing — resists traditional software because it requires judgment, not just rules. Our AI agent systems handle the work that was previously unmanageable: reading documents the way a person would, evaluating edge cases, and surfacing patterns you didn't know to look for. This isn't about doing the same things cheaper — it's about doing things you couldn't do before.

---

## Who This Is For (and Who It Isn't)

### Best-Fit Prospects

| Org Type | Why AI Agents Fit | Typical Entry Point |
|----------|-------------------|---------------------|
| **Mid-size Payers (50K–300K members)** | Exception queues are large enough to matter, small enough that they can't throw bodies at it | Prior authorization variation, EOB discrepancy detection |
| **HSOs processing high volumes (200K+ claims/year)** | Multi-payor complexity creates format variation that rule-based systems can't keep up with | Document intake and classification across payor formats |
| **Health Systems with owned health plans** | Straddling provider and payer worlds creates unique data interpretation challenges | Clinical-to-administrative document bridging |
| **Specialty Pharmacy / PBMs** | High-value claims with complex prior auth requirements and frequent formulary changes | Prior auth document processing, formulary exception handling |
| **Health Plans with HEDIS/Stars obligations** | Quality measure abstraction is expensive, seasonal, sample-limited, and labor-intensive — AI agents process 100% of charts | HEDIS/Stars clinical chart abstraction |
| **Health Plans / Provider Orgs with large networks (2,000+ providers)** | CMS directory accuracy mandates create ongoing compliance burden; manual validation can't keep up | Provider directory data validation |

### Disqualification Criteria — Walk Away If:

- **Processing volume is too low to justify the build.** For claims-focused use cases: under 75K claims/year. For quality measure use cases: under 50K members. For document/operations use cases: under 10K annual items. The threshold depends on the use case — qualify against the specific volume driver, not just claims.
- **They have no existing automation.** If they haven't automated the easy stuff yet, they need Workflow Automation first.
- **They're mid-migration to a new core system (Epic, Facets, QNXT).** Timing is wrong — revisit in 12–18 months.
- **Their "AI problem" is actually a data quality problem.** If the underlying data is garbage, an agent will just process garbage faster. Probe for this in discovery.
- **No executive sponsor for AI adoption.** AI agents require organizational willingness to trust automated judgment. Without top-down support, pilots stall in compliance review indefinitely.

---

## What AI Agents Actually Do — Concrete Use Cases

*Reps: use these to make the pitch tangible. Prospects don't buy "judgment" — they buy specific outcomes.*

### Use Case 1: EOB/Remittance Discrepancy Detection
The agent reads an EOB (which may arrive in a non-standard format), extracts denial reason codes, cross-references against the original authorization and contract terms, and flags discrepancies for human review. It handles format variation across payors without needing a new rule for each layout.

**Before:** 2 FTEs reviewing EOBs manually, catching ~70% of discrepancies, 3–5 day turnaround.
**After:** Agent processes 90%+ of EOBs automatically, flags genuine discrepancies with context, same-day turnaround. Humans review only flagged items.

### Use Case 2: Prior Authorization Document Processing
The agent reads incoming prior auth requests — faxes, portal submissions, attachments in varied formats — extracts clinical information, maps it against payor-specific criteria, and either auto-approves (within defined guardrails), requests additional information, or routes to a clinical reviewer with a pre-populated summary.

**Before:** Clinical staff spend 60%+ of time on administrative extraction, not clinical judgment.
**After:** Agent handles extraction and criteria mapping. Clinical staff focus on cases that genuinely require clinical expertise.

### Use Case 3: Denial Pattern Analysis
The agent analyzes denial data across the full claims population — not a sample — and surfaces patterns that humans can't see: specific procedure/payor/provider combinations with anomalous denial rates, trending denial reason codes, and seasonal variation. It produces actionable reports, not just dashboards.

**Before:** Quarterly manual analysis of denial samples. Patterns identified months after they start.
**After:** Continuous analysis with weekly pattern alerts. Revenue recovery actions begin within days.

### Use Case 4: HEDIS/Stars Clinical Chart Abstraction
The agent reads clinical notes — progress notes, lab results, medication lists — and evaluates whether the patient's care meets specific quality measure criteria (e.g., was a diabetic patient's HbA1c tested in the measurement year?). It abstracts relevant data points and maps them to HEDIS measure specifications.

**Before:** Teams of nurses manually review charts for quality measure compliance. A single HEDIS season requires 10–20+ temporary abstractors at $40–60/hr. Coverage is limited to statistical samples. Missed measures mean lower Star ratings and lower CMS payments.
**After:** Agent processes 100% of eligible charts — not a sample. Nurses review only cases where the agent flags ambiguity. Abstraction cost drops 60–80%, and measure capture rates improve because nothing is missed due to sampling.

### Use Case 5: Provider Directory Data Validation
The agent cross-references provider directory information across multiple sources — NPI registry, state licensing boards, health plan credentialing records, and provider self-reported data — and flags discrepancies for resolution. CMS mandates accurate provider directories; errors result in fines and member complaints.

**Before:** Directory updates are manual, periodic (quarterly at best), and rely on providers self-reporting changes. Error rates run 30–50% on key fields. Compliance teams scramble before CMS audits.
**After:** Agent continuously validates directory data against authoritative sources, flags discrepancies in real time, and generates audit-ready compliance reports. Error rates drop below 10%. CMS audit prep goes from weeks to hours.

### Use Case 6: Medical Record Request Interpretation
The agent reads incoming medical record requests — which arrive in widely varied formats via fax, portal, mail, and email — extracts the patient identifier, requesting party, date range, and record types requested, and matches them against the correct patient record for fulfillment.

**Before:** HIM staff manually read each request, interpret varied formats, identify the patient, and pull the right records. Turnaround is 5–15 business days. Errors in patient matching create compliance risk.
**After:** Agent auto-interprets 80%+ of requests, matches to the correct patient record, and queues for fulfillment. Staff handle only ambiguous cases. Turnaround drops to 1–3 days.

### Use Case 7: Clinical Chart Review & Decision Support
The agent reads a patient's clinical record — structured FHIR data across conditions, medications, labs, vitals, and notes — and answers clinician questions in plain English. Instead of navigating through multiple EHR screens for 10-15 minutes per patient, the clinician asks "Has the patient's blood pressure improved over the last six months?" and receives an auditable, sourced answer.

**Before:** Physicians spend 10-15 minutes per patient navigating EHR screens, cross-referencing medications, checking lab trends. Pre-visit chart review is a time sink that delays the start of clinical encounters.
**After:** Clinicians ask natural-language questions and receive fast, sourced answers. Chart review drops from 10-15 minutes to 1-2 minutes per patient. Clinical staff focus on care decisions, not data retrieval.

### Use Case 8: Clinical Documentation Quality Assessment
The agent evaluates clinical notes against quality standards (QNOTE, PDQI-9, or organization-specific criteria) — assessing nuanced criteria like "clarity of clinical reasoning," "thoroughness," and "medical necessity justification" that rule-based systems cannot measure. Operates at full document volume, not just samples.

**Before:** Manual review by nurse auditors covers a small sample of notes. Quality standards are reduced to simple checklists to enable automation. Inadequate documentation drives claim denials, downcoding, and compliance audit findings.
**After:** 100% of notes evaluated against full-fidelity quality standards. Deficiencies flagged before claim submission while corrections are still possible. Departments benchmarked against each other with consistent scoring.

---

## The Human-in-the-Loop Model

*This section exists because every healthcare buyer will ask about it. Know this cold.*

Our AI agents operate on a **confidence-threshold model**:

| Agent Confidence | Action | Example |
|-----------------|--------|---------|
| **High (above threshold)** | Auto-process with audit log | Clean EOB, standard format, amounts match |
| **Medium (near threshold)** | Process but flag for batch review | Minor format variation, small discrepancy within tolerance |
| **Low (below threshold)** | Route to human with context package | Unfamiliar format, significant discrepancy, missing data |
| **Out of scope** | Immediate escalation, no action taken | Document type the agent hasn't been trained on |

**Key points for prospect conversations:**
- Thresholds are configurable per client and per process — you control the risk tolerance
- The agent improves over time as human reviewers confirm or correct its decisions
- Every agent action is logged with the reasoning chain — full audit trail
- The agent knows what it doesn't know. It's designed to escalate, not guess.
- Error rates in production are typically lower than manual review because the agent doesn't get tired, distracted, or skip steps

---

## Discovery Questions

**Opening questions (start broad):**
- How large are your exception queues, and are they growing? What percentage of items actually need human judgment versus just being minor variations?
- Do you have document processing workflows where input formats vary — different layouts, missing fields, changing payor requirements?

**Deeper qualification (once interest is established):**
- Have you delayed automation projects because the specification effort was too large — too many edge cases to codify?
- How much of your operations staff's time is spent interpreting rather than just processing?
- Are there patterns in your denials, exceptions, or errors that you suspect exist but can't see because the data is too fragmented?
- What would change if your systems could handle the unexpected — rather than routing everything unusual to a human queue?

**Technical qualification (with IT stakeholders):**
- Where does your claims data live today? What's the path to access it programmatically?
- What are your current EDI transaction volumes and formats?
- Do you have a BAA process, or does your compliance team need to be involved from the start? *(Answer: involve them from the start — always.)*
- What's your cloud posture — on-prem, AWS, Azure, hybrid?

**Quantification (get the numbers that feed the ROI math):**
- What's the fully loaded annual cost of the staff who spend significant time on exception handling? *(Feeds FTE cost line.)*
- What percentage of their time goes to this specific process? *(Feeds % time allocation.)*
- How many items are in your exception queue right now, and what's the monthly growth rate? *(Feeds volume projections.)*
- What's the average value of a claim or transaction that gets caught in the exception process? *(Feeds recovery value calculations.)*
- What's your error rate on manually processed exceptions, and what does an average error cost to remediate? *(Feeds error remediation line.)*
- How many hours per month does your team spend on audit preparation for this process? *(Feeds compliance cost line.)*

**Volume qualification (determine which ROI model applies):**
- What's your annual claims volume? *(Claims-focused use cases)*
- How many members do you have in quality measure programs (HEDIS, Stars)? *(Quality measure use cases)*
- How many providers are in your network? *(Directory/compliance use cases)*
- What's your annual volume of [medical record requests / clinical notes / prior auth documents]? *(Document processing use cases)*

*The answer determines which ROI model to use. Not every AI agent opportunity is a claims story — qualify against the volume driver that matches the prospect's pain.*

*Use the prospect's answers to populate the Current State table in the ROI Math section. Prospect-provided numbers are far more persuasive than Vicert's ranges.*

---

## The ROI Math

### For a Mid-Size Payer (~200K claims/year)

| Current State | Annual Cost | How We Estimate |
|---------------|-------------|-----------------|
| Staff handling exceptions manually (3–5 FTEs partially dedicated) | $150–250K | FTE cost × % time on exception work |
| Errors from brittle rule-based systems | $50–100K | Error rate × cost per error × volume |
| Delayed automation due to specification complexity | $75–150K | Opportunity cost of deferred projects |
| Missed denial recovery (patterns not identified) | $100–300K | Denial rate × recoverable % × avg claim value |
| **Total quantifiable impact** | **$375–800K/yr** | |

| Vicert Solution | Cost | Notes |
|----------------|------|-------|
| Pilot engagement (single use case, 6–8 weeks) | $50–80K | Proves value on real data |
| Production system (first use case) | $150–250K | Phased build, 3–4 months |
| Expansion (additional use cases) | $75–150K each | Leverages existing infrastructure |
| Annual support & tuning | $40–60K/yr | Model monitoring, threshold adjustment |

*Payback calculations assume mid-range estimates for problem cost. The total quantifiable impact range ($375–800K/yr) is wide — validate with the prospect's actual data. At the low end of the range, the pilot and production system still pay back within 12–18 months because the solution cost is modest relative to the problem. Use the prospect's numbers whenever possible — they're far more persuasive than our ranges.*

### For a Health Plan — HEDIS/Stars Chart Abstraction (~120K Members)

| Current State | Annual Cost | How We Estimate |
|---------------|-------------|-----------------|
| Temporary abstractors (15 nurses × $50/hr × 12-week season) | $270–360K | Abstracter count × rate × hours per season |
| Staff coordination and oversight | $30–50K | Internal FTE time managing the abstraction process |
| Missed measures from sampling limitations | Hard to price directly | Lower Star ratings → lower CMS payments (each Star ≈ 3-5% of Part C/D revenue) |
| **Total quantifiable impact** | **$300–410K/yr** | |

| Vicert Solution | Cost | Notes |
|----------------|------|-------|
| Pilot engagement (chart abstraction, single measure set) | $60–80K | 6-8 weeks, proves accuracy on real charts |
| Production system (full HEDIS measure set) | $175–250K | 3-4 months |
| Annual support & tuning | $40–60K/yr | Measure spec updates, model monitoring |

*Volume driver: member count, not claims. A plan with 50K+ members in quality measure programs has sufficient volume. The ROI improves significantly for larger plans because abstraction costs scale linearly with members while the AI system scales near-flat.*

### For a Health Plan — Provider Directory Compliance (~4,000 Providers)

| Current State | Annual Cost | How We Estimate |
|---------------|-------------|-----------------|
| Compliance staff validating directory data (1-2 FTEs, 60-80% of time) | $70–120K | FTE cost × % time on validation |
| CMS audit prep labor (3+ weeks/quarter) | $30–50K | Staff hours × frequency |
| Fines and corrective action plan costs | $25–100K | Varies by state; CMS penalties for directory inaccuracies |
| Member complaints and grievances from inaccurate directory | Hard to price directly | Downstream costs in member services, potential enrollment loss |
| **Total quantifiable impact** | **$125–270K/yr** | |

| Vicert Solution | Cost | Notes |
|----------------|------|-------|
| Pilot engagement (directory validation, single data source cross-ref) | $50–70K | 6-8 weeks |
| Production system (multi-source continuous validation) | $150–200K | 3-4 months |
| Annual support | $40–50K/yr | Source updates, rule adjustments |

*Volume driver: provider count in network. Organizations with 2,000+ providers have sufficient volume and complexity. ROI is strongest when CMS audit pressure is active or when the organization has received directory accuracy findings.*

### What's NOT in This Math (Be Honest About This)

- **Transition costs:** Staff time for requirements, data access setup, UAT. Budget 15–20% of project cost in prospect staff time.
- **Infrastructure:** Agent runs in cloud (client's or Vicert-managed). Cloud compute costs are real but modest ($1–3K/month typical).
- **Ongoing tuning:** Models need periodic retraining as payor rules change. This is included in annual support but the prospect should understand it's not "set and forget."

---

## Common Objections & Responses

*For universal objections that apply across all services (budget, vendor trust, "send me a proposal," "you're too small"), see Vicert-Services-Overview.md. Below are AI Agent–specific objections.*

### Tier 1: Objections You'll Hear in Every Conversation

| They Say… | You Say… |
|-----------|----------|
| **"AI seems overhyped — is this actually production-ready?"** | Fair concern. This isn't ChatGPT answering questions. These are purpose-built agent systems with domain-specific training, explicit guardrails, and human oversight at every decision point. They're handling real claims, real authorizations, real documents — in production, today. I'd be skeptical too if someone just said "AI." Let me show you specifically what the agent does and doesn't do. |
| **"We're worried about compliance and accuracy with AI."** | You should be — and so are we. That's why these systems are built with explicit confidence thresholds, full audit trails, and automatic escalation paths. The agent knows when to handle something and when to escalate. Everything is logged with the reasoning chain. In practice, consistency is actually better than manual review because the agent applies the same criteria every time. But let's get your compliance team involved early — we expect that and plan for it. |
| **"How is this different from RPA or rules engines?"** | RPA follows scripts. Rules engines follow decision trees. Both break when something unexpected happens — and in healthcare, "unexpected" is Tuesday. AI agents apply judgment: they can read a document they've never seen before, evaluate whether a discrepancy matters, and handle reasonable variations without being explicitly programmed for each one. The difference shows up most clearly in your exception queue — that's the work RPA can't touch. |

### Tier 2: Tougher Objections from Experienced Buyers

| They Say… | You Say… |
|-----------|----------|
| **"Our compliance/legal team will never approve AI making decisions on claims."** | They shouldn't approve it blindly — and we don't ask them to. The agent operates within defined guardrails: configurable confidence thresholds, mandatory escalation for specified scenarios, and a complete audit trail for every decision. We've been through this review process before and we build the compliance documentation into the engagement. We'll want your compliance team at the table from week one, not as an afterthought. |
| **"We're in the middle of a core system migration. We can't take on another project."** | Understood — and I wouldn't suggest layering on complexity during a migration. Two questions: When is your go-live, and what's the plan for the exception handling workflows that your new core system won't solve? Because a Facets or QNXT migration fixes your transaction processing, but it doesn't fix the judgment-based work. We should talk again [3–6 months post-go-live] so you're ready to tackle what's left. *(Note: This is a deferral, not a loss. Set a calendar reminder.)* |
| **"We had a vendor promise AI transformation before and it went nowhere."** | What happened? *(Listen carefully — the answer tells you what to avoid.)* Most AI projects in healthcare fail for one of three reasons: they tried to boil the ocean instead of starting with a focused use case, they lacked healthcare domain expertise, or they didn't build the human oversight model. We start with a single, high-value process, prove it works on your actual data in 6–8 weeks, and scale only after you've seen results. |
| **"What happens when the AI gets it wrong?"** | It will get some things wrong — the question is how the system handles that. The agent has a confidence threshold: below it, the item goes to a human. Everything is logged, so you can see exactly why the agent made a given decision. Error rates in production are typically comparable to or better than manual review — and critically, agent errors are *consistent* and *detectable*, unlike human errors which are random and invisible until an audit. |
| **"This sounds expensive and experimental."** | The pilot is $50–80K over 6–8 weeks, focused on one specific process with your actual data. That's less than a quarter of one FTE's annual cost. You'll know within weeks whether the approach works for your environment. The investment scales with proven value, not speculation. If the pilot doesn't demonstrate clear ROI, you've spent less than you'd spend on two months of the status quo. |
| **"What about hallucinations? We can't have AI making things up on claims."** | This is the right question. Our agents are *not* generative AI writing free-form responses. They're structured systems that extract, classify, and compare against defined criteria. They don't "create" information — they read, match, and decide within a bounded action space. When the agent encounters something it can't classify with confidence, it escalates. It doesn't fill in the blanks. |
| **"We already tried building something internally with our data science team."** | What did you learn? *(Listen.)* Internal experiments are valuable — they prove the concept has merit. The gap is usually in production hardening: building the guardrails, audit trails, exception handling, monitoring, and domain-specific grounding that turn a prototype into a system you'd trust with real claims. That's the engineering we bring — not just the model, but everything around it. |

---

## Competitive Positioning

### vs. Traditional Software / RPA (UiPath, Automation Anywhere, Blue Prism)
Traditional software does what you told it to do. AI agents figure out what needs to be done. When the next edge case hits, RPA breaks and adds to your exception queue. Agents adapt. *The tell:* if they're already using RPA, ask about their exception rate trend — it's almost always growing.

### vs. Big AI Vendors / Consulting Firms (Cognizant, Deloitte, Accenture + Azure/AWS AI)
For AI specifically: they sell horizontal AI platforms and leave you to figure out healthcare. We build domain-specific agent systems that understand adjudication logic, clinical documentation requirements, and payor-specific rules from day one. Our team doesn't need a healthcare glossary. *(For universal positioning against big consultancies, see Vicert-Services-Overview.md.)*

### vs. Healthcare-Specific AI Competitors (Waystar, Availity, Change Healthcare automation)
These are feature extensions of existing platforms — bolt-on AI within their ecosystem. If you're already deep in their stack and happy with it, that may work. But if you need AI that works across systems, handles your specific edge cases, and isn't locked to one vendor's data model, you need a purpose-built solution.

### vs. Internal AI Experiments
Experimenting is valuable, but production-grade agent systems need guardrails, audit trails, monitoring, and domain grounding that go far beyond a prototype. The question isn't whether your team can build a model — it's whether they can build the *system* around it that makes it trustworthy at scale.

### vs. Waiting
The organizations that figure out AI agents first will have a capability advantage that compounds. In healthcare, where complexity is the defining characteristic, that advantage is especially durable. And the cost of waiting isn't zero — it's the cost of your current exception handling multiplied by every month you delay.

---

## Buying Process Map

*Healthcare AI purchases typically require 3–5 stakeholders. Plan for this.*

| Stakeholder | Their Concern | What They Need From You |
|-------------|--------------|------------------------|
| **VP Operations** (usually the champion) | Will this actually reduce my team's burden? | Demo with realistic use case, projected FTE impact |
| **CIO / VP Technology** | Integration complexity, maintenance burden, security | Architecture overview, deployment model, data flow diagram |
| **Chief Compliance Officer / Privacy** | HIPAA, audit trail, liability if agent errs | Compliance documentation, confidence threshold model, BAA |
| **CFO / VP Finance** | ROI, total cost including hidden costs | Honest ROI model with transition costs included |
| **CMO / Medical Director** (if clinical processes) | Clinical accuracy, patient safety | Clinical validation approach, human oversight model |

**Typical timeline from first conversation to signed SOW:** 8–16 weeks for pilot, longer if compliance review is complex. Don't promise faster — it creates friction with compliance.

---

## Why We Lose — Learn From These

| Reason We Lost | What Happened | How to Prevent |
|----------------|--------------|----------------|
| **Compliance killed it** | We engaged operations but didn't bring compliance in early enough. By the time they reviewed, they had concerns we could have addressed but the momentum was gone. | Get compliance at the table by meeting 2–3. Don't let it be a surprise. |
| **Core system migration** | Prospect was 6 months from go-live on a new platform. No bandwidth for another initiative. | Qualify timing early. Defer gracefully and set a follow-up for post-migration. |
| **"We'll build it ourselves"** | Internal data science team convinced leadership they could do it cheaper. (They usually can't, but that takes 12 months to learn.) | Acknowledge their team's capability. Position Vicert as the production engineering layer, not a replacement for their data science. |
| **Sticker shock on pilot** | $50–80K felt too high for "just a test." | Anchor against the annual cost of the problem, not against zero. $50K pilot vs. $375K+ annual cost. |
| **No executive sponsor** | Middle management was interested but couldn't get budget approval without a C-level advocate. | Identify the executive sponsor early. If there isn't one, coach your champion on how to make the internal case. |

---

## When to Introduce Another Service

Listen for these signals during AI Agents conversations — they indicate complementary needs:

- **Underlying processes aren't formalized.** If their workflows are running on spreadsheets and tribal knowledge, AI agents need something structured to plug into. They need **Workflow Automation** first to formalize the process, then AI agents to handle the judgment-based parts.
- **Drowning in overlapping SaaS tools alongside the AI need.** If the AI pain point (exception queues, document variation) exists within a broader mess of disconnected tools, a **Custom Healthcare Platform** becomes the foundation. Build the platform, then layer AI on top.
- **"What else can this do?"** After a successful pilot, prospects often want to expand. First, look for additional AI use cases within their operation. Then, as the conversation broadens, explore **Platform consolidation** or **Workflow Automation** for the processes around the AI system.
- **"We need a portal/dashboard for this."** If they want a user-facing interface around the AI agent's output — a portal for reviewing results, managing exceptions, tracking patterns — that's a **Custom Platform** project with AI embedded. Scope it as a single engagement.
- **The prospect's AI pain is quality measures, not claims processing.** If HEDIS abstraction costs or Star rating improvement is the driver, the AI agent scope is quality-focused. The ROI model changes — it's about abstracter cost reduction and measure capture rates, not claims exception handling. Use the HEDIS/Stars ROI scenario, not the claims scenario.
- **The prospect is a health-tech company building an AI-powered product.** If they're building AI into a product they sell (not applying AI to their own operations), this isn't an AI Agents operational engagement — it's a **Health-Tech Engagement** with AI capabilities built into the product. Redirect to the Health-Tech Engagement model: managed delivery team or turnkey product build with AI as a feature, not a standalone service. See Battlecard-Health-Tech.md.

---

## Phrases That Work

> *"You stop telling machines how to do things and start telling them what to do."*

> *"The difference between saving money and creating value is the difference between software that follows instructions and systems that apply judgment."*

> *"Your exception queue isn't a queue problem — it's a capability problem. Traditional software just can't handle ambiguity."*

> *"These agents don't just do the work — they improve the work. They spot patterns in denials that nobody knew to look for."*

> *"The agent knows what it doesn't know. When it's not confident, it asks a human. How many of your staff can say the same?"*

> *"You're not buying AI — you're buying the ability to handle the 30% of work that no software has ever been able to touch."*
