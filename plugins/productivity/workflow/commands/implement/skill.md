# Implement Feature

You are implementing a planned feature. This command enforces that proper planning was done.

**Feature:** $ARGUMENTS

## Prerequisites Check (MANDATORY)

Before ANY implementation, verify:

### Required Documents
1. **PRD** - `docs/features/[feature-slug]/PRD.md`
   - Must exist
   - Must have Status: Approved (or explicit user approval in conversation)

2. **Implementation Plan** - `docs/features/[feature-slug]/plan.md`
   - Must exist
   - Must have Status: Ready or Approved
   - Must list files to modify/create
   - Must have implementation steps

### Optional but Check
3. **Architecture** - `docs/features/[feature-slug]/architecture.md`
   - Check if plan mentions architectural decisions
   - If significant decisions exist without ADR, recommend creating one first

## Validation Response

After checking, report:
```
## Implementation Readiness: [Feature Name]

### Prerequisites
- [ ] PRD: [Found and Approved / Found but not approved / MISSING]
- [ ] Plan: [Found and Ready / Found but draft / MISSING]
- [ ] Architecture: [Found / Not required / RECOMMENDED but missing]

### Decision
[READY TO IMPLEMENT / BLOCKED - reason]
```

**If BLOCKED:**
```
Cannot proceed with implementation.

Missing prerequisites:
- [List what's missing]

To resolve, run:
- /new-feature [feature-name]  (if PRD missing)
- /plan [feature-slug]         (if plan missing)
- /architecture [feature-slug] (if ADR recommended)
```

**DO NOT PROCEED IF BLOCKED. STOP HERE.**

## Implementation Phase

Only if all prerequisites are met:

### Step 1: Review Plan
Re-read the implementation plan and confirm:
- Files to modify
- Files to create
- Implementation steps
- Testing strategy

### Step 2: Follow the Plan
Implement according to the plan's steps. For each step:
1. Announce what you're implementing
2. Write the code
3. Mark the step complete in plan.md

### Step 3: Update Documentation
As you implement:
- Update plan.md status for each completed step
- Note any deviations from the plan (and why)
- Update PRD if requirements clarity improved

### Step 4: Testing
Follow the testing strategy from the plan:
- Write tests as specified
- Run existing tests to prevent regressions
- Document any test gaps

### Step 5: Completion
When implementation is complete:
- Update plan.md Status to "Complete"
- Summarize what was built
- Note any follow-up items or tech debt

## Implementation Rules

**DO:**
- Follow existing code patterns (check CLAUDE.md)
- Write tests alongside implementation
- Commit in logical chunks
- Update plan.md as you progress

**DON'T:**
- Skip steps in the plan
- Add features not in the PRD (scope creep)
- Ignore the testing strategy
- Leave plan.md outdated

---

## Response Format

Start your response with the Validation Response format above, then proceed only if READY TO IMPLEMENT.
