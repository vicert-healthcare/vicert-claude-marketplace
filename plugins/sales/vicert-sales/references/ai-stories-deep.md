# AI Agent Systems — Complete Case Studies

Full unabridged content for Vicert's three AI agent system case studies. Use this reference when writing detailed technical proposals, long-form blog posts, deep-dive marketing content, or any material that benefits from the full narrative, architecture details, and economic analysis.

---

## 1. Susan: AI-Powered Outbound Voice Agent

**URL**: https://vicert.ai/stories/ai-voice-agent.html
**Technologies**: LangGraph, LangChain, Python, OpenAI, ElevenLabs API

### Introduction

This demonstration validates a crucial insight for healthcare organizations: custom AI voice agents can now be built using commodity tools and modern LLMs, eliminating the need for expensive, specialized vendor platforms.

Susan is an AI-powered outbound voice agent capable of conducting natural conversations with patients to gather health information. The demonstration proves that organizations can build their own solutions with full control, dramatic cost savings, and quality that matches or exceeds commercial platforms.

AI-driven voice assistants generally fall into two categories. Inbound Agents respond to incoming queries and requests, similar to customer support representatives answering calls (example: an automated hospital phone system handling appointment scheduling and prescription refills). Outbound Agents proactively reach out to gather information, provide support, and execute tasks (example: an AI system calling patients for post-discharge follow-ups to monitor recovery and ensure medication adherence).

Susan is an outbound agent designed for patient engagement—demonstrating the capability to initiate calls, conduct structured conversations, and collect actionable health data.

### Business Value & Economics

Healthcare organizations conducting patient outreach have historically chosen from three expensive options:

**1. In-House Human Staffing:**
Hiring a full-time nurse or coordinator costs $45K-60K annually including benefits, with a typical capacity of 20-25 productive calls per day, totaling roughly 5,000 calls per year. Cost per call: $9-12. Limitations include fixed capacity that cannot easily scale, scheduling constraints tied to business hours, and quality inconsistency.

**2. Outsourced Call Centers:**
Cost per call: $2-5. Provides scalable capacity and eliminates hiring overhead. However, introduces HIPAA compliance concerns, quality control difficulties, high agent turnover, limited clinical knowledge, and potential brand risk.

**3. Vendor AI Voice Platforms:**
Cost per call: $3-7 (accounting for platform fees, usage charges, and abandoned calls). Delivers 40-70% savings compared to human staffing with scalable infrastructure and 24/7 availability. Limitations include costs that remain expensive at scale, vendor lock-in, and limited customization.

**The Custom LLM-Based Solution:**
Cost per call: $0.30-0.75. Savings vs. human: 94-97%. Savings vs. vendor AI: 90-95%. All advantages of AI plus cost efficiency plus full control.

### Real-World Cost Comparison (2,000 calls/year)

| Approach | Annual Cost | Cost Per Call |
|----------|-------------|---------------|
| Human FTE (in-house) | $45K-60K | $22.50-30 |
| Outsourced Call Center | $4K-10K | $2-5 |
| Vendor AI | $6K-14K | $3-7 |
| Custom AI | $600-1,500 | $0.30-0.75 |

**Custom Solution ROI:**
- Initial development: $15K-25K
- Pays for itself after 300-500 patient interactions
- Year 1 net savings: $5K-13K (vs. vendor AI)
- Year 2+ annual savings: $12K-25K
- 5-year total savings: $50K-100K vs. vendor platform

**At scale (10,000 calls/year):**
- Human (in-house): $180K-240K (4 FTEs)
- Outsourced Call Center: $20K-50K
- Vendor AI: $30K-70K
- Custom AI: $3K-7.5K
- Annual savings: $27K-62K vs. vendor AI, $17K-46K vs. outsourced

### Key Capabilities Demonstrated

**1. Dynamic and Context-Aware Conversations**: Susan generates natural responses based on the script's intent, patient input, and real-time context—not reading from a fixed script—while ensuring all required information is gathered.

**2. Handling Non-Straightforward Responses**: Patient answers are not always clear. Susan manages conversations requiring multiple turns to obtain definitive responses.

**3. Understanding Implicit References**: When a patient says "same as the previous question," Susan correctly infers and records the appropriate response based on conversation history.

**4. Generating Structured Output**: Susan interprets and structures patient responses accurately. If a patient says "I've experienced that a few times during the last week," Susan categorizes it as "Several days" according to standardized response format.

**5. Managing Unscripted Topics**: Patients engage in off-script discussions (privacy concerns, clarifying questions, tangents). Susan navigates these without explicit scripting.

**6. Detecting Changing Answers**: If a patient changes their mind during the call, Susan recognizes the change and captures the correct final information.

**7. Configuration Flexibility**: Different scripts for different call types (follow-ups, surveys, reminders). Patient information from external data sources (text files, CRM, EHR). Customizable voice parameters (speed, pitch, tone, accent, volume, gender, conversational style).

### Strategic Advantages Beyond Cost

**Full Control & Customization**: Direct EHR/CRM integration without middleware or API limitations. Conversation flows designed specific to clinical protocols. Organization-specific compliance and security implementations. Complete data ownership with no vendor data sharing. Rapid iteration: update scripts and add use cases in days without vendor approval processes.

**Strategic Independence**: No vendor lock-in. Flexibility to adopt new AI models and techniques as they evolve. Proprietary implementations that create competitive advantage. Investment protection through flexibility to pivot without sunk costs.

### Healthcare-Specific ROI Opportunities

**Post-Discharge Follow-Ups**: Required for value-based care contracts. 5% readmission reduction for a 200-bed hospital = $500K-1M annual savings. Custom agents can scale to reach 100% of discharged patients.

**Appointment Reminders**: Reducing no-shows by 10-15% = direct revenue recovery. For a practice with 10,000 appointments/year at $200 average = $200K-300K recovered revenue. 24/7 availability improves contact rates vs. business-hours calling.

**Chronic Disease Management**: Regular check-ins for diabetes, hypertension, heart failure patients. Improved medication adherence reduces complications and ER visits. Early intervention when patients report concerning symptoms.

**Patient Satisfaction Surveys**: HCAHPS scores directly impact Medicare reimbursement. Higher response rates from phone surveys vs. mail. Real-time feedback enables rapid service improvements.

### Market Shift

Until recently, specialized AI voice platforms justified premium pricing through superior technology. Today the landscape has fundamentally changed. Modern LLMs provide conversation quality that matches or exceeds vendor solutions. Commodity voice synthesis services (ElevenLabs, Azure, Google) deliver professional-grade audio at a fraction of the cost. The moat around vendor solutions has eroded.

The technology gap between custom solutions and specialized vendor platforms has closed. Even running on a local laptop with suboptimal infrastructure, Susan demonstrates capabilities comparable to commercial platforms. In production with optimized cloud deployment, remaining lag and audio issues would be eliminated entirely.

### Conclusion

Healthcare organizations can now build custom AI voice agents using commodity tools and modern LLMs, achieving quality that matches or exceeds expensive vendor platforms at a fraction of the cost. The traditional trade-off between quality and cost no longer exists. Organizations that recognize this shift early position themselves to build proprietary capabilities, avoid vendor lock-in, innovate faster than competitors, and scale patient engagement programs that were previously cost-prohibitive.

---

## 2. BackMR: Rethinking Chart Review with Multi-Agent AI

**URL**: https://vicert.ai/stories/chart-review-ai.html
**Technologies**: FHIR, LangGraph, LangChain, OpenEvals, Python, OpenAI

### The Problem: Chart Review as a Bottleneck

Medical professionals spend significant portions of their workday manually reviewing patient charts. A typical pre-visit chart review requires a physician to navigate to the patient's record, check the problem list and recent diagnoses, review vital signs trends, examine lab results and flag abnormalities, cross-reference medications with conditions, verify insurance coverage, scan specialist notes, and identify care gaps. This process often takes 10-15 minutes per patient and involves clicking through numerous screens presenting data in siloed formats that don't align with how clinicians naturally think about care.

Traditional EHR systems excel at storing and organizing data but fall short at synthesizing information across domains to answer specific clinical questions.

### The Solution: A Multi-Agent AI Architecture

BackMR addresses these challenges through a hierarchical multi-agent system that acts as an intelligent layer between clinicians and their EHR data. Healthcare professionals can ask questions in plain English: "Has the patient's blood pressure improved over the last six months?" or "What insurance coverage did the patient have at the time of their last ER visit?"

The system leverages two foundational LLM capabilities:

**Advanced Reasoning and Planning**: Modern LLMs understand complex questions and break them down into step-by-step sub-tasks, enabling coherent chart review strategies without pre-programmed logic for every question type.

**Native Understanding of FHIR**: LLMs were trained on healthcare standards including FHIR R4 API specification. They can generate valid FHIR queries on demand, retrieving exactly the right type of structured data without pre-built templates.

### Architecture

BackMR's architecture is built on agent specialization and iterative reasoning. When a clinician submits a question, it flows through four stages:

**1. Planning**: A Planner agent decomposes the natural language question into logical reasoning steps. Example: "Has the patient's blood pressure improved?" becomes → retrieve BP observations from past 6 months → analyze trend direction → summarize results.

**2. Orchestration**: A central Chart Analyzer receives the plan and delegates sub-questions to appropriate specialized agents.

**3. Execution**: Nine specialized domain agents execute their tasks:
- Clinical Agent: Conditions, procedures, clinical notes
- Diagnostics Agent: Labs, imaging, pathology reports
- Medications Agent: Prescriptions, administrations, immunizations
- Administrative Agent: Encounters, scheduling, referrals
- Financial Agent: Billing, claims, coverage
- Social Determinants Agent: Socio-economic factors, environment
- Patient Agent: Demographics and identifiers
- Entities Agent: Providers, organizations, care teams
- System Info Agent: Internal metrics and usage

Each agent uses specialized tools to query FHIR APIs, retrieve structured data, and return focused insights.

**4. Reflection and Self-Correction**: The synthesized answer passes through a Reflection module that scores completeness and accuracy from 0 to 1. If below threshold (0.6), the system provides feedback and returns to the Planner to refine.

### Smart FHIR Tooling: The Technical Edge

A key innovation is "smart FHIR tooling" combining deterministic querying with intelligent fallbacks. When an agent needs data, it first attempts a precise FHIR query using standard parameters. If the query returns no results due to inconsistent coding practices, the system retrieves all resources of the requested type and invokes a separate LLM-based filter agent.

Example: If "Has the patient ever had abnormal liver function tests?" returns nothing via standard codes, the fallback retrieves all lab data and lets the LLM determine which entries constitute liver function tests and which values are abnormal. This ensures coverage without compromise.

### BackMR vs. Alternative Approaches

| Approach | Strengths | Limitations | When to Use |
|----------|-----------|-------------|-------------|
| BackMR (Agent-based FHIR) | Auditable data paths, adaptable to complex queries, modular & extensible, iterative reasoning | More complex implementation, requires FHIR API access | Comprehensive clinical reasoning and complex queries |
| Full-context queries | Conceptually simple, no pre-processing | Most records exceed context windows, non-auditable | Very small records or limited scope |
| Embedding + vector search | Works with unstructured notes, simple implementation | Weak on structured data, limited reasoning | Summarization from clinical notes |
| RAG pipelines | Good document retrieval | Same vector search limitations, challenges with numerical data | QA over semi-structured documents |
| Knowledge Graph-based RAG | Rich semantic context, relationship queries | Complex preprocessing, schema challenges | Relationship-heavy queries |

### Real-World Applications

**Nurses and Care Managers**: Quickly gather patient information for care coordination, answer patient questions during phone calls, identify barriers to care.

**Physicians**: Prepare for encounters without extensive pre-charting, perform deep dives into complex cases, assess clinical risk scores on demand.

**CDI Teams**: Validate documentation against structured and unstructured data, identify gaps between coded diagnoses and supporting evidence.

**Patient Navigation Systems**: Power intelligent chatbots and virtual assistants querying patients' own records.

**Administrative Staff**: Verify insurance coverage, check prior authorization status, review billing and claims.

### Example Scenarios

**Scenario 1**: A care manager asks "Which social factors may be impacting this patient's medication adherence?" BackMR retrieves patient-reported SDOH data, examines insurance coverage and cost-sharing, reviews notes mentioning financial concerns or transportation barriers, and synthesizes a comprehensive answer highlighting pharmacy access limitations, high copays, and housing instability.

**Scenario 2**: A physician asks "Does the patient meet criteria for sepsis based on the most recent vitals and labs?" BackMR retrieves latest vital signs (temperature, heart rate, respiratory rate, blood pressure), pulls recent lab results (WBC, lactate), applies clinical criteria, and provides a structured answer with supporting values.

**Scenario 3**: An administrator asks "Show me the summary of claims from past 12 months. Who covered these costs?" BackMR queries Explanation of Benefits resources, aggregates claims by payer, summarizes total costs and coverage, and presents a breakdown of insurance vs. patient responsibility.

### The Vision: AI-Native Healthcare Infrastructure

BackMR explores an alternative to brittle, hardcoded EHR logic: replace static logic with a dynamic, intelligent reasoning layer — FHIR in the back, generic UI on top, and LLM-powered agents in between.

Practitioners can program the business logic of chart review in plain English. A cardiologist might define standard questions that BackMR executes on every patient record before appointments. An oncology practice might create question sets for tumor staging and treatment planning.

### Extensibility

BackMR's modular architecture supports incremental expansion: new agents for specialized domains (Oncology, Radiology, Behavioral Health), agents refined into more specialized sub-agents, new tools beyond FHIR (medical literature search, clinical calculators, guideline databases), and custom workflows defined by clinical teams without software development.

---

## 3. Applying AI and LLMs to Healthcare Documentation Challenges

**URL**: https://vicert.ai/stories/clinical-notes-review.html
**Technologies**: LangGraph, LangChain, OpenEvals, Python, OpenAI API

### The Challenge

Healthcare organizations have clear definitions of quality clinical documentation through standards like QNOTE and PDQI-9 — criteria requiring thorough notes that demonstrate clinical reasoning, justify medical necessity, and enable care coordination. The challenge was systematically measuring quality at the massive scale healthcare demands.

Manual review provides thoroughness but reaches only small samples. Rule-based systems can analyze everything but fail to measure sophisticated criteria like "thoroughness" or "clarity of clinical reasoning." Organizations must either water down standards to match technological limitations or preserve sophisticated standards while accepting limited evaluation coverage.

### Business Impacts of Poor Documentation

Inadequate documentation quality drives tangible costs: insurance claims face denial or downcoding when documentation lacks necessary elements, directly reducing revenue. Compliance audits uncover documentation gaps. Quality performance metrics drop when high-quality care lacks proper documentation. Provider evaluation becomes inconsistent when different reviewers interpret standards subjectively.

**The complexity dimension**: Standards like QNOTE and PDQI-9 establish quality through sophisticated criteria — "clarity with comprehensiveness," "conciseness with completeness," "show clinical reasoning," "justify medical necessity," "enable care coordination." These are nuanced assessments along continuous spectrums that traditional technology cannot measure.

**The scale dimension**: Major healthcare systems produce millions of clinical documents per year. Manual evaluation reaches only small samples. Traditional approaches reduced standards to simple checkboxes for automation — fundamentally altering the measurement.

### The Vicert Solution: A Flexible AI Evaluation Framework

The platform was built around a fundamental insight: large language models can comprehend and evaluate nuanced criteria in ways traditional technology cannot. LLMs interpret meaning and context — they can assess whether documentation "shows empathy" or "contains adequate detail for care continuity" because they comprehend the content rather than merely scanning for terms.

#### Component 1: Configurable Evaluation Standards

The platform accommodates both established industry standards (QNOTE, PDQI-9) and customized criteria matching organizational needs. Standards are organized hierarchically:

**Question Groups** arrange related criteria into coherent sections. QNOTE contains groups such as "Chief Complaint(s)", "History of Present Illness (HPI)", "Assessment (diagnosis; differential)", and "Plan of Care."

**Questions or Attributes** within each group specify particular evaluation criteria with an attribute name (e.g., "Conciseness", "Sufficient information", "Clear clinical reasoning") and an ideal note description establishing the quality benchmark.

Four distinct scoring approaches provide flexibility:
- **Rubrics** — Categorical scales ("Fully", "Partially", "Unacceptable") for comprehensive evaluation
- **Yes/No Binary** — Straightforward binary evaluation for compliance verification
- **Scale 1 to 5** — Five-point ordinal scale with descriptive anchors for comparative tracking
- **Scale 1 to 10** — Ten-point scale for maximum precision in performance evaluation

Organizations can create specialized evaluation standards for specific clinical departments. Example: a cardiology-focused standard evaluating cardiovascular documentation using criteria general standards don't address — cardiovascular disease family history specifically (not just "family history"), ECG findings contextualized with symptoms (not just "test results included"), ejection fraction, arrhythmia burden, and sudden cardiac death risk assessment. This custom standard strategically uses rubrics for patient history and treatment, a 1-5 scale for diagnostics, a 1-10 scale for risk stratification, and Yes/No for regulatory requirements like patient education and consent.

#### Component 2: Scalable Evaluation API

The evaluation engine accepts clinical notes and returns structured evaluations. Organizations submit notes with evaluation standard specification, the system retrieves corresponding prompts, the LLM generates structured evaluations with scores and comprehensive explanations for each criterion, and results return in standardized formats.

Each evaluation includes both scores and comprehensive reasoning. Example: evaluating a STEMI patient note, the HPI might receive "Fully" ratings for sufficient information and conciseness with detailed justification. The Plan of Care might receive "Partially" with specific guidance on missing elements like heparin dosing, consent documentation, and disposition plans.

For a complete QNOTE evaluation, a clinical note receives 43 individual assessments. Each rating receives numeric values (Fully = 10, Partially = 5, Unacceptable = 0), producing an overall score out of 430 maximum points. This enables benchmarking across departments, trend monitoring, performance standards, and tracking provider growth.

#### Component 3: Quality Verification Layer

Using OpenEvals, the system executes quality assessments on its own evaluations, checking for hallucination detection (do evaluations make claims unsupported by actual documentation?) and conciseness evaluation (are evaluations clear and targeted?). Evaluations failing quality thresholds trigger human review rather than automatic acceptance.

### Applications Beyond Clinical Notes

**Clinical Note Quality Assessment**: Assess notes against QNOTE, PDQI-9, or organizational standards before claim submission. Detect deficiencies while corrections remain possible.

**Prior Authorization Documentation**: Establish payer-specific criteria and assess requests pre-submission. Evaluates whether clinical narratives successfully demonstrate medical necessity per each payer's nuanced requirements, resulting in enhanced approval rates with decreased administrative workload.

**Discharge Summary Quality**: Evaluate completeness and clarity before patient discharge. Checks for medication reconciliation, clear follow-up directions, and essential narrative context — complex criteria that directly affect readmission rates.

**Quality Measure Documentation**: Systematically verify documentation supporting quality measures before reporting deadlines. Documentation deficiencies frequently impact quality scores — not from care failures, but documentation inadequacies.

**Peer Review and Case Analysis**: Custom peer review evaluation frameworks applied uniformly across reviews, introducing consistency to traditionally subjective processes.

### Key Learnings

**Customization proved indispensable.** Various organizations face different documentation demands based on payer relationships, patient characteristics, and internal priorities. Platforms forcing pre-defined criteria fail practical requirements.

**Verification required foundational integration.** Trust in AI evaluations demands systematic quality validation. Embedding verification in core architecture — not adding it afterward — proves essential.

**Standards existed, but scalable application was the gap.** Healthcare professionals had created sophisticated standards. The technology gap was in consistent evaluation across millions of documents. LLMs address that gap.

**The pattern generalizes broadly.** The architecture functions wherever healthcare professionals create content requiring complex standard compliance. The investment creates reusable capability, not single-function tools.

**Human expertise gains power rather than losing relevance.** The platform amplifies expert knowledge. What previously applied only to small samples through costly manual review now scales across comprehensive documentation.

### Conclusion

The platform proves that the divide between sophisticated documentation standards and operational scale can be crossed. Organizations needn't choose between substantial quality criteria and comprehensive assessment. The identical methodology functions wherever healthcare organizations must systematically assess human-created content against sophisticated standards — from clinical notes to prior authorizations to discharge summaries to peer reviews.
