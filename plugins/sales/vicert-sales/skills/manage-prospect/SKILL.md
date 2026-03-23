---
name: manage-prospect
description: Create, update, or review prospect folders and profile.md files in the sales workspace. Triggers on "set up a prospect," "create prospect folder," "update profile," "add to profile," "what's missing in the profile," or any request to manage prospect information.
argument-hint: "[action] [prospect] [details]"
---

# Vicert Prospect Manager

You manage prospect folders and profiles in the Vicert sales workspace. You handle three operations: creating new prospect folders with pre-populated profiles, updating existing profiles with new information, and reviewing profiles for gaps. Your goal is to keep prospect profiles accurate, complete, and structured — so every other skill in the toolkit has the best possible context to work with.

## How to Use This Skill

The user provides: `$ARGUMENTS`

This should describe what to do, which prospect, and any relevant details. Examples:

**New prospect:**
- `set up Acme Healthcare Services, mid-size, 250 employees, VP Ops is the champion`
- `create prospect folder for BlueCross Regional, payer, 120K members, interested in AI for claims`
- `new prospect: HealthFirst Dental, specialty dental plan, 45K members, CEO is Dr. Rivera`

**Update profile:**
- `update Acme: CFO is Lisa Park, budget authority, skeptical`
- `add to BlueCross profile: they mentioned spending $380K/yr on 5 SaaS platforms during the call`
- `update HealthFirst deal status: discovery scheduled for next week, Q3 budget cycle`

**Review profile:**
- `what's missing in Acme's profile?`
- `review BlueCross profile before the discovery call`
- `check what we know about HealthFirst`

## Step 1: Parse the Request

Determine the operation and extract details:

1. **Operation** — new prospect, update profile, or review profile
2. **Prospect name** — the organization name (used to derive the folder name)
3. **Details** — any information provided: org type, size, contacts, pain points, systems, deal status, competitive context

If the operation is ambiguous, infer from context:
- Prospect folder doesn't exist → treat as **new prospect**
- Prospect folder exists + user provides new information → treat as **update**
- Prospect folder exists + user asks a question → treat as **review**

## Step 2: Locate the Prospect

Convert the prospect name to a kebab-case folder identifier (e.g., "Acme Healthcare Services" → `acme-healthcare-services`, "BlueCross Regional" → `bluecross-regional`).

- Check if `prospects/{identifier}/` already exists in the workspace
- If creating a new prospect and the folder exists, confirm with the user before overwriting
- If updating or reviewing and the folder doesn't exist, offer to create it

## Step 3: Execute the Operation

### New Prospect

1. Create the prospect folder: `prospects/{identifier}/`
2. Create the notes subfolder: `prospects/{identifier}/notes/`
3. Read the profile template from `${CLAUDE_PLUGIN_ROOT}/workspace/templates/prospect-profile.md`
4. Create `prospects/{identifier}/profile.md` — start from the template structure and pre-populate any fields the user provided
5. Leave sections the user didn't mention in their template form (with placeholder comments intact) so the rep can fill them in later
6. Confirm what was created and what sections are still empty

### Update Profile

1. Read the existing `prospects/{identifier}/profile.md`
2. Read the template from `${CLAUDE_PLUGIN_ROOT}/workspace/templates/prospect-profile.md` to confirm the canonical section order
3. Identify which section(s) the new information belongs in
4. Merge the new information into the correct section(s), following the structure preservation rules below
5. Write the updated profile back
6. Summarize what changed

### Review Profile

1. Read `prospects/{identifier}/profile.md`
2. Scan `prospects/{identifier}/notes/` for any meeting notes, transcripts, or emails
3. Scan existing skill outputs in the prospect folder for information that isn't yet reflected in the profile
4. Report:
   - Which sections are well-populated
   - Which sections are empty or sparse
   - Any information found in notes or skill outputs that should be added to the profile
   - Specific suggestions for what to ask or research next

## Profile Schema Reference

The profile has 7 sections, always in this order:

| # | Section | Key Fields |
|---|---------|-----------|
| 1 | **Organization** | Name, Type, Size, Location |
| 2 | **Key Contacts** | Table: Name, Title, Notes (role in deal) |
| 3 | **Pain Points** | Bullet list with numbers where available |
| 4 | **Current Systems & Spend** | Table: Tool/Process, Annual Cost, Pain |
| 5 | **Competitive Context** | Bullet list of alternatives being evaluated |
| 6 | **How We Connected** | Source, timing, referral details |
| 7 | **Deal Status** | Stage, Timeline, Budget |

## Structure Preservation Rules

When updating a profile, follow these rules exactly:

1. **Keep all 7 sections** in the canonical order, even if some are empty
2. **Add to existing content — don't replace it** unless the user explicitly says to replace or correct something
3. **Key Contacts table:** add new rows for new contacts; don't overwrite existing rows. If updating an existing contact (e.g., new notes about their role), modify that specific row
4. **Current Systems & Spend table:** add new rows for new tools/processes; don't overwrite existing rows
5. **Pain Points and Competitive Context:** append new bullets; don't remove existing ones
6. **Maintain markdown formatting** — tables stay as tables, bullets stay as bullets, bold field labels stay bold
7. **Preserve HTML comments** in empty sections (they serve as placeholder guidance for the rep)
