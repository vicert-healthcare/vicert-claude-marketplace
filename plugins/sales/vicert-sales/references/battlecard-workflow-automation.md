# Workflow Automation

## Sales Battlecard — Internal Use Only

---

## The Elevator Pitch

> Your most critical workflows don't run on software — they run on Janet in accounting. The Excel file that's been "temporary" for seven years, the Access database someone built before they left, the process that exists only in three people's heads. These shadow systems quietly cost you $100–200K+ a year in labor, errors, and risk. We replace them with documented, resilient systems for $150–250K — and that investment pays for itself within 18 months.

---

## Who This Is For (and Who It Isn't)

### Best-Fit Prospects

| Org Type | Why Workflow Automation Fits | Typical Entry Point |
|----------|------------------------------|---------------------|
| **HSOs (50–500 employees)** | Grew fast on spreadsheets and manual processes that worked at smaller scale. Now fragile. | Claims reconciliation, provider payment tracking |
| **Health Plans — Operations teams** | Back-office processes that are too specific for their core platform | Member grievance tracking, credentialing workflows, compliance reporting |
| **Provider Groups / MSOs** | Multi-site operations with inconsistent processes across locations | Referral management, authorization tracking, reporting consolidation |
| **Healthcare Startups scaling past 50 employees** | Founder-era processes breaking as headcount grows | Any process that "only Sarah knows how to do" |

### Disqualification Criteria — Walk Away If:

- **The workflow they want to automate is well-served by existing off-the-shelf tools.** If Jira, Monday.com, or a Salesforce flow would solve it, tell them. They'll trust you more, and the real opportunity will come later.
- **The process isn't actually defined — even informally.** If nobody can describe what happens step by step (even on a whiteboard), you'll spend the entire engagement doing process discovery, not building software. That's consulting, not a build — price it differently or recommend they do discovery first.
- **The annual cost of the current process is under $75K.** The build cost won't generate meaningful ROI. Look for higher-pain workflows or a bundled engagement with multiple workflows.
- **The organization has no appetite for change.** If the people who run the workflow are hostile to replacing it and leadership won't mandate adoption, the system will be built and ignored. Probe for this: "How does your team feel about changing this process?"
- **They want to automate a compliance process without involving compliance.** This will fail. Compliance must be at the table for any workflow that touches audit, reporting, or regulatory requirements.

---

## Discovery Questions

**Opening questions (identify shadow systems):**
- Do you have business-critical processes that depend on specific people rather than documented systems?
- What happens when the person who "knows how this works" is on vacation or calls in sick?
- Are there spreadsheets or Access databases in your organization that would terrify you if an auditor asked about them?

**Deeper qualification (quantify the pain):**
- How long does it take to onboard someone new into your operational workflows? Weeks? Months?
- Have you ever lost institutional knowledge when someone left? How long did it take to recover?
- What percentage of your operations team's time goes to data wrangling versus actual decision-making?
- How much time does your team spend on audit preparation? What's the anxiety level around it?

**Technical qualification:**
- Where does the data for this workflow currently live? Spreadsheets, email, shared drives, someone's desktop?
- How many people touch this workflow, and what are their roles?
- Are there regulatory or compliance requirements attached to this process? (e.g., state reporting deadlines, CMS audit requirements)
- Have you tried to document or replace this process before? What happened?

**Quantification (get the numbers that feed the ROI math):**
- What's the fully loaded annual cost of the staff who spend significant time on this workflow? *(Feeds FTE cost line in ROI model.)*
- What percentage of their time goes to this specific process? *(Feeds % time allocation.)*
- What's your error rate on this process, and what does an average error cost to remediate? *(Feeds error remediation line.)*
- How many hours per month does your team spend on audit preparation for this process? *(Feeds compliance cost line.)*
- How long does it take to onboard someone new into this workflow? *(Feeds training/onboarding cost.)*

*Use the prospect's answers to populate the Current State table in the ROI Math section. Prospect-provided numbers are far more persuasive than Vicert's ranges.*

### Use Case 4: Grievance and Appeals Tracking
State and CMS regulations mandate strict timelines for grievance acknowledgment, investigation, and resolution — typically 30 days for standard grievances, 72 hours for expedited. Many smaller payers and HSOs track these in spreadsheets, risking missed deadlines and regulatory penalties.

**Before:** Grievances tracked in Excel with manual deadline calculations. No automated alerts. Compliance team lives in fear of state audit findings. Documentation is scattered across email threads and shared drives.
**After:** System enforces timeline rules automatically, sends escalation alerts before deadlines, maintains a complete audit trail of every action taken, and generates state-mandated reports on demand. Audit prep drops from weeks to minutes.

### Use Case 5: Network Adequacy Reporting
States require health plans to demonstrate adequate provider networks — enough providers of each specialty within geographic and wait-time standards. Data comes from multiple sources (provider directory, claims, geo data) and must be assembled and validated for each reporting period.

**Before:** Analyst spends 2–3 weeks per reporting period manually pulling data from multiple systems, cross-referencing, and building the report. Errors trigger state follow-up and corrective action plans.
**After:** System pulls from connected data sources, applies network adequacy rules automatically, generates compliant reports, and flags gaps requiring attention. Reporting time drops from weeks to days. Analysts focus on gap remediation, not report assembly.

### Use Case 6: Payment Posting / ERA-EOB Matching
Matching Electronic Remittance Advice (ERA) to claims and posting payments is high-volume and error-prone, especially when dealing with multiple payers with different formats and adjustment codes.

**Before:** Staff manually match remittance records to claims, research discrepancies, and post adjustments. At scale, 5–15% of payments require manual intervention. Errors in posting cascade into incorrect AR aging and delayed follow-up.
**After:** System auto-matches 85–90% of remittance records, applies adjustment codes, and posts payments. Staff review only genuine exceptions. AR accuracy improves, and payment posting lag drops from days to hours.

---

## The ROI Math

### Scenario A: Single High-Pain Workflow (e.g., Claims Reconciliation at a 200-Person HSO)

| Current State | Annual Cost | How We Estimate |
|---------------|-------------|-----------------|
| FTE time on manual workflow (1–2 people, 60–80% of time) | $70–120K | FTE cost × % time on this specific process |
| Error remediation (1–3% error rate at scale) | $25–50K | Error rate × cost per error × annual volume |
| Training / onboarding delays when staff turns over | $15–25K | Weeks of reduced productivity × frequency |
| Knowledge concentration risk (key-person dependency) | Hard to price, but real | Ask: "What happens if [name] leaves?" |
| Compliance exposure / audit prep labor | $10–25K | Staff hours on audit prep × frequency |
| **Total quantifiable cost** | **$120–220K/yr** | |

| Vicert Solution | Cost | Notes |
|----------------|------|-------|
| System build (single workflow) | $150–250K one-time | 3–4 months for working first phase |
| Staff transition (their time) | $10–20K equivalent | 2–3 weeks of parallel running and training |
| Annual maintenance | ~$30K/yr | Hosting, support, minor enhancements |
| **Total Year 1 cost** | **$190–300K** | |
| **Total Year 2+ cost** | **~$30K/yr** | |
| **Payback period** | **12–18 months** | At mid-range estimates |

*Payback calculations assume mid-range estimates for both problem cost and solution cost. At the low end of problem cost and high end of build cost, payback extends to ~30 months. We validate exact numbers during discovery using the prospect's actual data before committing to a specific ROI projection. Use the formula: Payback = Year 1 Cost ÷ (Annual Problem Cost – Annual Maintenance).*

### Scenario B: Multiple Related Workflows (e.g., Credentialing + Provider Onboarding + Compliance Reporting)

| Current State | Annual Cost |
|---------------|-------------|
| Combined FTE time across workflows (2–4 people) | $150–280K |
| Error remediation across processes | $40–80K |
| Cross-process data reconciliation | $20–40K |
| **Total** | **$210–400K/yr** |

| Vicert Solution | Cost |
|----------------|------|
| Bundled build (3 related workflows) | $200–350K one-time |
| Annual maintenance | ~$40K/yr |
| **Payback period** | **10–14 months** |

### Scaling the Math by Org Size

| Org Size | Typical Workflow Cost | Typical Build Cost | Payback |
|----------|----------------------|--------------------|---------|
| Small (50–100 employees) | $75–120K/yr | $100–175K | 12–18 months |
| Mid (100–500 employees) | $120–250K/yr | $150–250K | 10–16 months |
| Large (500+ employees) | $200–400K/yr | $200–350K | 8–14 months |

*Payback periods in this table assume mid-range estimates. Validate with the prospect's actual numbers — their data is far more persuasive than our ranges.*

### What's NOT in This Math (Be Honest About This)

- **Process discovery time.** If the workflow isn't well-understood even informally, expect 2–4 weeks of discovery before building starts. This is billed time.
- **Change management.** The people who currently run the workflow need to adopt the new system. If they resist, the system sits unused. Probe for this risk early and involve the actual users — not just management — in requirements.
- **Adjacent process changes.** Automating one workflow often reveals that adjacent processes also need attention. This is a feature (upsell opportunity), not a bug, but set expectations that Phase 1 has a defined scope.
- **Data cleanup.** If the current data lives in messy spreadsheets, there's migration and cleanup work. Budget 10–15% of project cost for this if data quality is poor.

---

## Common Objections & Responses

*For universal objections that apply across all services (budget, vendor trust, "send me a proposal," "you're too small"), see Vicert-Services-Overview.md. Below are Workflow Automation–specific objections.*

### Tier 1: Standard Objections

| They Say… | You Say… |
|-----------|----------|
| **"It works well enough — we've managed this way for years."** | "Working" means three people and a prayer. It means nobody can take vacation the same week. It means audit prep runs on anxiety and hope. I'm not questioning whether it works today — I'm asking what it costs you. Add up the labor, the errors, the onboarding time, and the risk. "Well enough" is usually $120–250K a year. |
| **"We tried to document/replace this before and it was too complex."** | That complexity is real — it's why you're still living with the workaround. But AI-accelerated engineering has dropped the cost 3–5x by compressing the scaffolding, testing, and boilerplate work — while our engineers focus on the domain logic and edge cases. The project that was quoted at $800K is now $150–250K. The complexity didn't change — the economics did. *(See "What AI-Accelerated Engineering Means" in Vicert-Services-Overview.md for the full explanation.)* |
| **"We can't pull people away from their work for a software project."** | Your best people are already pulled away — from the work they should be doing. They're spending their time on data wrangling instead of decisions. Your operations director didn't get hired to maintain a pivot table. We need 2–4 hours per week from key users during the build — that's it. |

### Tier 2: Tougher Objections from Experienced Buyers

| They Say… | You Say… |
|-----------|----------|
| **"What if the person who knows the process retires/leaves before we start?"** | That's exactly why you should start now, not later. Every month without documentation is another month of risk. We capture institutional knowledge and build it into the system — the system becomes the documentation. If that person is within 12 months of leaving, this is urgent, not optional. |
| **"Our team will resist a new system. They're comfortable with what they know."** | That's normal, and we plan for it. The most successful transitions involve the actual users in requirements — not just management dictating what gets built. When Janet helps design the system that replaces her spreadsheet, she becomes an advocate instead of a resistor. But this requires leadership commitment to adoption. If leadership isn't willing to mandate the transition, we should discuss that risk upfront. |
| **"Can't we just hire a junior person to document everything instead?"** | You can document a process, but documentation doesn't run the process. It doesn't enforce the steps, catch the errors, or survive the next person's interpretation of what the document means. You need a system, not a manual. And documentation projects in healthcare have about a 30% completion rate — they start strong and fade when daily work takes priority. |
| **"This feels like it should be an IT project, not a vendor engagement."** | It could be, if your IT team has healthcare workflow expertise and available capacity. Most IT teams are already stretched supporting existing systems, and this kind of workflow engineering isn't their core skill set. We bring both the technical capability and the domain knowledge to move fast. Your IT team should absolutely be involved — in architecture review, security, and infrastructure decisions — but the build itself is what we accelerate. |
| **"What about the data that's currently in our spreadsheets? Can we migrate it?"** | Yes, data migration is part of the engagement. The real question is data quality — if the spreadsheets have inconsistencies, missing fields, or duplicates, we'll need to clean that up during migration. We budget for this and we'll give you a realistic assessment of migration effort once we see the data. |
| **"We have a similar project planned with our EHR/core system vendor."** | What's the timeline and scope they've quoted? *(Listen.)* In our experience, core system vendors are excellent at their core functionality but slow and expensive for custom workflow builds. If they've quoted 12+ months and a six-figure customization fee, that's a sign this isn't their strength. We can often build and deploy before they'd complete their scoping phase. |
| **"The spreadsheet works fine — it's the process around it that's the problem."** | That's often the case — and it's a good sign, because it means the logic is understood even if the system is fragile. We're not just replacing the spreadsheet; we're replacing the tribal knowledge, the manual error-checking, and the "only Janet knows the formula in column AX" risk. The spreadsheet is the symptom. The risk is the disease. |

---

## Competitive Positioning

### vs. Staying with Spreadsheets / Shadow Systems
Every day these workflows run on spreadsheets is a day your institutional knowledge exists only in someone's head. When they leave, it leaves with them. Spreadsheets don't enforce process steps, don't create audit trails, and don't scale. The question isn't whether the spreadsheet works — it's whether you can afford the risk.

### vs. Big Consultancies (Deloitte, Accenture, McKinsey implementation arms)
For workflow projects specifically: consultancies over-scope and over-engineer. They'll turn a single workflow build into a $500K+ "process transformation" engagement that takes 6–12 months. We find the highest-pain workflow and build a focused, practical system in 3–4 months. *(For universal positioning against big consultancies, see Vicert-Services-Overview.md.)*

### vs. Off-the-Shelf Workflow Tools (Monday.com, Asana, ServiceNow, Appian)
If an off-the-shelf tool fit, you'd already be using one. These workflows exist as manual processes precisely because they're too specific for generic software. Healthcare credentialing, claims reconciliation, and compliance reporting have domain-specific logic that Monday.com will never understand.

### vs. Internal IT Build
Your IT team *could* build this — if they had the bandwidth, the workflow engineering expertise, and 6–12 months to dedicate. Most internal IT teams are already stretched supporting production systems. We accelerate the build while your IT team stays focused on keeping the lights on.

### vs. Doing Nothing
The cost of doing nothing isn't zero — it's $120–250K per year in labor, risk, and lost capacity, paid invisibly across budget lines nobody looks at. Plus the catastrophic risk of losing the one person who understands the process. "No budget" doesn't mean "no cost."

---

## Buying Process Map

| Stakeholder | Their Concern | What They Need From You |
|-------------|--------------|------------------------|
| **VP Operations** (usually the champion) | Will this actually work? Will my team adopt it? | Walkthrough of their specific workflow in the new system. Involve their key users early. |
| **CFO / VP Finance** | Why spend $150–250K on something that "works"? | ROI model showing current hidden costs vs. build cost. Show the invisible spend. |
| **CIO / IT Director** | Maintenance burden, security, integration with existing systems | Architecture overview, deployment model, maintenance SLA. Emphasize reduced integration complexity. |
| **Compliance / Risk** | Audit trail, regulatory compliance, process documentation | The system *is* the documentation. Demonstrate audit trail capabilities. |
| **The People Who Run the Workflow** (Janet, etc.) | Am I being replaced? Is this going to make my job harder? | Involve them in requirements. Position the system as freeing them for higher-value work, not eliminating their role. This is critical — if they resist, adoption fails. |

**Typical timeline from first conversation to signed SOW:** 4–8 weeks for single workflow, 6–12 weeks for multi-workflow engagement.

**Common bottleneck:** Getting access to the actual workflow details. The people who know the process are busy running it and may not prioritize requirements sessions. Build this into the timeline.

---

## Why We Lose — Learn From These

| Reason We Lost | What Happened | How to Prevent |
|----------------|--------------|----------------|
| **"It's not broken enough"** | Pain was real but not acute. Leadership didn't prioritize over other initiatives. | Quantify the cost in specific dollars. Vague pain doesn't get budget. |
| **Janet killed it** | The person running the workflow felt threatened and lobbied against the project. Leadership deferred to them. | Involve Janet early. Make her the subject matter expert for the build, not the target of it. |
| **Scope couldn't be defined** | Nobody could articulate the full workflow clearly enough to scope. Discovery meetings kept uncovering more complexity. | Propose a paid discovery phase ($15–25K) before committing to a build price. This de-risks both sides. |
| **IT blocked it** | IT didn't want another system to support and didn't believe the low-maintenance narrative. | Get IT in the room early with architecture details. Show how the system reduces their burden, don't just assert it. |
| **Budget went to a "bigger" project** | Our $200K workflow build lost budget priority to a $1M EHR upgrade. | Position as complementary: "The EHR upgrade doesn't solve your shadow system problem. This does, and it's 1/5 the cost." |

---

## Pilot Structure for Quick Wins

*When a prospect is interested but not ready to commit to a full build, offer a structured quick win:*

| Phase | Duration | Cost | Deliverable |
|-------|----------|------|-------------|
| **Discovery** | 2 weeks | $15–25K | Documented workflow, identified pain points, data assessment |
| **Prototype** | 3–4 weeks | $40–60K | Working prototype of the core workflow loop |
| **Validation** | 2 weeks | Included | Prospect team tests with real scenarios, feedback incorporated |
| **Decision point** | — | — | Prospect commits to full build or walks away with the documentation |

This structure lets prospects see a working system before committing to the full engagement. The discovery documentation has standalone value even if they don't proceed.

---

## When to Introduce Another Service

Listen for these signals during Workflow Automation conversations — they indicate a bigger opportunity:

- **Growing exception queues that resist rule-based automation.** If they say "we automated the easy stuff but the exceptions keep growing," introduce **AI Agent Systems**. The exception queue is the classic AI Agents entry point.
- **Three or more tools they're reconciling data between.** If their workflow pain comes from stitching together multiple SaaS platforms, the real fix may be a **Custom Healthcare Platform** that replaces the patchwork, not just automating the gap-filling.
- **Document interpretation is part of the workflow.** If the process involves reading varied documents — faxes, PDFs, portal submissions in different formats — scope an **AI Agent** component into the workflow build. The workflow handles the process flow; the agent handles the document variation.
- **"We have five more processes like this."** After a successful single-workflow build, the natural progression is a **multi-workflow bundle** — and once multiple workflows are running on proper systems, the conversation shifts to a **Custom Platform** that unifies them.
- **The prospect is a health-tech company with internal operational pain.** If they're a technology company building a healthcare product and their workflow pain is internal (billing on spreadsheets, manual HR processes, reporting in Excel), Workflow Automation applies to those internal ops — but their primary engagement is likely the Health-Tech product build. Lead with the product build, scope internal workflow automation as a secondary engagement. See Battlecard-Health-Tech.md.

---

## Phrases That Work

> *Usage note: "Janet" language works in conversations with VP Operations and above — it makes the abstract tangible. When talking to the actual workflow owners, use the positioning from the Buying Process Map instead: "We're freeing you for higher-value work" and "You'll be the expert who designs the system." Never use "Janet" language in front of Janet.*

> *"Your most critical workflows don't run on software you bought. They run on Janet in accounting."*

> *"Just because there's no invoice doesn't mean it's free."*

> *"You're not saving money by not having software — you're spending it on salary, risk, and lost capacity."*

> *"The system we build doesn't take vacation, doesn't retire, and doesn't keep tribal knowledge in its head."*

> *"Nobody's replacing Janet. We're giving Janet a system so she can do the work she was actually hired to do."*

> *"Your auditor doesn't want to hear 'Janet knows.' They want to see a system."*
