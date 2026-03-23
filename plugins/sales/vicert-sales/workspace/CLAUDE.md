# Vicert Sales Workspace

This is a sales working folder managed with the Vicert Sales Toolkit plugin (`vicert-sales`).

## File Organization

Save every sales artifact you produce as a Markdown file, organized by prospect. The workspace also holds shared context that informs every skill run.

```
my-profile.md                            ← shared communication style preferences
prospects/
├── {prospect-identifier}/
│   ├── profile.md                       ← prospect profile (user fills out)
│   ├── notes/                           ← meeting notes, transcripts, emails (user adds)
│   │   ├── 2026-02-13-intro-call.md
│   │   └── 2026-02-15-discovery-transcript.md
│   ├── outreach-cold-email-2026-02-13.md   ← skill outputs (Cowork generates)
│   ├── prep-call-2026-02-15.md
│   ├── compete-vs-cognizant-2026-02-18.md
│   ├── proposal-executive-2026-02-22.md
│   ├── roi-analysis-2026-02-25.md
│   └── recap-opportunity-2026-02-27.md
└── {another-prospect}/
    └── ...
```

### Prospect Folders

- Infer a short kebab-case identifier from the prospect's name (e.g., "Acme Healthcare Services" → `acme-healthcare-services`, "BlueCross Regional" → `bluecross-regional`)
- Create the `prospects/` directory and prospect subfolder automatically if they don't exist
- If the user mentions a prospect by name, check for a matching folder under `prospects/` before asking

### File Naming

Use this pattern: `{skill}-{document-type}-{YYYY-MM-DD}.md`

| Skill | Example Filenames |
|-------|-------------------|
| `write-outreach` | `outreach-cold-email-2026-02-13.md`, `outreach-linkedin-2026-02-13.md`, `outreach-sequence-2026-02-13.md` |
| `prep-call` | `prep-call-2026-02-15.md` |
| `compete` | `compete-vs-cognizant-2026-02-18.md`, `compete-vs-in-house-2026-02-18.md` |
| `write-proposal` | `proposal-one-pager-2026-02-20.md`, `proposal-executive-2026-02-22.md`, `proposal-follow-up-2026-02-22.md` |
| `build-roi` | `roi-analysis-2026-02-25.md` |
| `recap-opportunity` | `recap-opportunity-2026-02-27.md` |

If producing multiple documents of the same type on the same day, append a short qualifier (e.g., `outreach-cold-email-cfo-2026-02-13.md`).

## User-Provided Context

The workspace can contain context that the team provides — prospect profiles, meeting notes, call transcripts, and communication style preferences. Read these before generating any output.

### Reading Priority Order

When running any skill for a prospect, read context in this order:

1. **`my-profile.md`** (workspace root) — if it exists, apply the communication style preferences when generating outputs
2. **`profile.md`** (prospect folder) — if it exists, use as the baseline: org details, contacts, pain points, systems, competitive context, deal status
3. **`notes/`** (prospect folder) — if it exists, scan files (most recent first) for additional context
4. **Prior skill outputs** (prospect folder) — read existing outputs to understand what's already been produced

### Prospect Profile (`profile.md`)

A structured file the rep fills out once per prospect. If it exists in the prospect folder, always read it first — it's the single best source of deal context.

- Use the profile as baseline context for every skill invocation
- Don't ask the user to repeat information that's in the profile
- When creating a new prospect folder, offer to create a starter `profile.md` from the template
- After a skill run that reveals new information (e.g., discovery call surfaces competitive context), suggest updating `profile.md`

### Meeting Notes & Transcripts (`notes/`)

A subfolder for raw call notes, transcripts, and email threads. These are unstructured — no rigid format required. Naming convention: `YYYY-MM-DD-{description}.md` (or `.txt` for raw transcripts).

When reading from `notes/`:

- **Scan for key signals** rather than quoting verbatim — transcripts can be very long (5K–20K+ words)
- **Priority signals to extract:** specific pain points mentioned, numbers/metrics disclosed, objections raised, stakeholder dynamics, competitive mentions, timeline/urgency signals, and commitments made
- **Read most recent files first** — newer notes are more likely to reflect the current deal state
- Use information from notes to fill gaps not covered in `profile.md`

### Communication Style (`my-profile.md`)

A shared file at the workspace root that defines the communication style and tone for all skill outputs.

- If it exists, apply the style preferences when generating outputs
- If it doesn't exist, generate outputs in a standard professional tone

## Context Continuity

Before running any vicert-sales skill for a prospect, gather context in the reading priority order above:

1. Read `my-profile.md` from the workspace root if it exists — apply communication style preferences
2. Read `profile.md` from the prospect's folder if it exists
3. Scan `notes/` in the prospect's folder if it exists (most recent first)
4. Read prior skill outputs to understand what's already been produced — pain points identified, numbers gathered, competitive context, stakeholders involved
5. Reference relevant prior context in the new output (e.g., "Building on the discovery call prep from Feb 15, where we identified...")

This ensures that each new artifact builds on accumulated deal knowledge rather than starting from scratch.

## Saving Outputs

After producing a vicert-sales skill output:

1. Save the full output as a Markdown file using the naming convention above
2. Confirm the file path to the user so they know where it lives
3. If this is a new prospect, briefly note that a new prospect folder was created
