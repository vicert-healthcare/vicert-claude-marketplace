# Plan Feature Implementation

You are creating an implementation plan for a feature.

**Feature:** $ARGUMENTS

## Prerequisites Check

First, verify the following exists:
1. `docs/features/[feature-slug]/PRD.md` - Must exist and be filled in
2. PRD must have "Status: Approved" or explicit user approval

**If PRD is missing or incomplete:**
```
STOP - Cannot create implementation plan without approved PRD.
Please run: /new-feature [feature-name]
```

## Your Tasks

### Step 1: Read and Understand PRD

Read the PRD thoroughly. Summarize:
- Core problem being solved
- Key requirements
- Constraints and non-goals

### Step 2: Analyze Codebase

Explore the existing codebase to understand:
- Relevant existing patterns to follow
- Files that will need modification
- Potential integration points
- Dependencies to consider

### Step 3: Create Implementation Plan

Create `docs/features/[feature-slug]/plan.md` with:

```markdown
# Implementation Plan: [Feature Name]

**Status:** Draft | Ready | In Progress | Complete
**PRD:** [link to PRD.md]
**Created:** [date]
**Author:** [name/AI-assisted]

## Summary
[One paragraph describing the implementation approach]

## Technical Approach
[Describe the high-level technical solution]

## Files to Modify
| File | Changes | Complexity |
|------|---------|------------|
| path/to/file.ts | Description of changes | Low/Med/High |

## Files to Create
| File | Purpose |
|------|---------|
| path/to/new-file.ts | Description |

## Dependencies
- [ ] External packages needed
- [ ] Internal modules to use
- [ ] Services/APIs to integrate

## Implementation Steps
1. [ ] Step 1 description
2. [ ] Step 2 description
3. [ ] Step 3 description
...

## Testing Strategy
- Unit tests: [approach]
- Integration tests: [approach]
- Manual testing: [checklist]

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Risk description | High/Med/Low | How to address |

## Open Questions
- [ ] Question 1
- [ ] Question 2

## Rollback Plan
[How to revert if something goes wrong]
```

### Step 4: Review with User

Present the plan summary and ask:
- Does this approach make sense?
- Any concerns about the technical decisions?
- Ready to proceed with implementation?

**IMPORTANT RULES:**
- Do NOT write implementation code yet
- Do NOT skip analyzing existing code patterns
- Get explicit approval on the plan before implementing
- If architecture decisions are significant, recommend `/architecture` first

### Step 5: Next Steps

Once the plan is approved:
- If significant architecture decisions: `/architecture [feature-slug]`
- Otherwise: `/implement [feature-slug]`

---

## Response Format

Start your response with:
```
## Implementation Plan: [Feature Name]
**Status:** Planning Phase
**PRD:** docs/features/[feature-slug]/PRD.md [Found/MISSING]
```

Then proceed with the tasks.
